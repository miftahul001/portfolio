const defaultHead = a => Buffer.from(`HTTP/1.1 200 OK
Cache-Control: max-age=0, no-store, must-revalidate
Expires: 0
Content-type: application/json
Content-Length: ${a}

`)


const writeResp = (a, b) => {
	b = Buffer.from(JSON.stringify(b))
	a.write(defaultHead(b.length))
	a.end(b)
}

const processPost = (a,b) => { //a = socket, b = message json
	
	if (b.cmd == 'cmd1') {
		
		writeResp(a, {
			status: 200,
			data: b
		})
		
	} else if (b.cmd == 'cmd2') {
		
		writeResp(a, {
			status: 200,
			data: b
		})
		
	} else {
		writeResp(a, {
			status: 200,
			data: []
		})
	}
	
}

module.exports = (a,b) => {
	
	try {
		b = JSON.parse(b.toString('utf8', b.indexOf(Buffer.from('\r\n\r\n'))+4))
		//a.setTimeout(1000 * 60 * 3)
		processPost(a,b)
		
	} catch (b) {
		console.log(b)
		a.end('HTTP/1.1 400 Bad Request\r\n\r\n')
	}
	//console.log(b.toString('utf8', 0, b.indexOf(Buffer.from('\r\n'))).split(' ')[1].substring(1))
}