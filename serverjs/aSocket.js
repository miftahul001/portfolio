const process = require('node:process')
const crypto = require('crypto')
const wsKey = Buffer.from('Sec-WebSocket-Key: ')
const wsUpgrade = a => `HTTP/1.1 101 Switching Protocols
Connection: Upgrade
Upgrade: websocket
Sec-WebSocket-Accept: ${crypto.createHash('sha1').update(a).digest('base64')}

`

const readData = a => {
	const frameType = a.readUInt8()
	var frameLn = a.readUInt8(1) & 127
	var header = 2, buf
	if (frameLn < 126) {
		buf = Buffer.alloc(frameLn+2)
		buf.writeUInt8(frameLn, 1)
	} else if (frameLn == 126) {
		header = 4
		frameLn = a.readUInt16BE(2)
		buf = Buffer.alloc(frameLn+4)
		buf.writeUInt8(126, 1)
		buf.writeUInt16BE(frameLn, 2)
	} else {
		header = 10
		frameLn = a.readBigUInt64BE(2)
		buf = Buffer.alloc(frameLn+10)
		buf.writeUInt8(127, 1)
		buf.writeBigUInt64BE(frameLn, 2)
	}
	buf.writeUInt8(129)
	
	var currentOffset = header+4
	const mask = a.readUInt32BE(header)
	const data = Buffer.alloc(frameLn)
	
	for (var i = 0, j = 0; i < frameLn; ++i, j = i % 4) {
		const shift = j === 3 ? 0 : (3 - j) << 3
		
		const umask = (shift === 0 ? mask : (mask >>> shift)) & 0xFF
		const source = a.readUInt8(currentOffset++)
		buf.writeUInt8(umask ^ source, header+i)
	}
	return buf.toString('utf8', header)
}

const packData = a => {
	var buf
	if (a.length<126) {
		buf = Buffer.alloc(2+a.length)
		buf.writeUInt8(129)
		buf.writeUInt8(a.length, 1)
		buf.write(a, 2)
	} else {
		buf = Buffer.alloc(4+a.length)
		buf.writeUInt8(129)
		buf.writeUInt8(126, 1)
		buf.writeUInt16BE(a.length, 2)
		buf.write(a, 4)
	}
	return buf
}

const handleWS = a => {
	var id = 0
	a.on('data', b => {
		if (b.readUInt8() == 136) {
			a.end()
		} else {
			try {
				process.send({a:'broadcast2', b:{senderId:id, senderPid:process.pid, data: JSON.parse(readData(b)) }})
			} catch (b) {
				console.log(b)
				a.write(packData(JSON.stringify({msg:'error', data:b})))
			}
		}
	})
	a.once('close', ()=>{ console.log('WS closed') })
	a.on('error', b=>{ console.log('WS error: %s', b.message) })
	
	process.send({a:'getId'})
	process.on('message', b => {
		({
			setId: b => { id = b},
			msg: b => {
				a.write(packData(JSON.stringify({...b, receiverId:id, receiverPid:process.pid})))
			},
		})[b.a](b.b)
	})
}

module.exports = (a, b) =>{
	const c = b.indexOf(wsKey)+wsKey.length
	if (c>19) {
		a.write(wsUpgrade(b.toString('utf8', c, b.indexOf(Buffer.from('\r\n'), c))+'258EAFA5-E914-47DA-95CA-C5AB0DC85B11'))
		a._events.data = []
		handleWS(a)
		return true
	}
	return false
}