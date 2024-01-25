const cluster = require('node:cluster')
const process = require('node:process')
const fs = require('fs')
const fname = require('path').basename(__filename) + '.pid'
const get1 = require('./aGet')
const post1 = require('./aPost')
const isWebSocket = require('./aSocket')

if (cluster.isPrimary) {
	fs.writeFile(fname, `${process.pid}\n`, a=>{ if (a) throw a })
	
	var id = 1
	require('node:os').cpus().slice(1).forEach(a => {
		const c = cluster.fork()
		fs.appendFile(fname, `${c.process.pid}\n`, a=>{ if (a) throw a })
		
		c.on('message', a => {
			({
				getId: a => {
					c.send({a:'setId', b:id})
					id++
				},
				broadcast1: a => {
					Object.keys(cluster.workers).forEach(b => {
						c != cluster.workers[b] && cluster.workers[b].send({a:'msg', b:a.b})
					})
				},
				broadcast2: a => {
					Object.keys(cluster.workers).forEach(b => {
						cluster.workers[b].send({a:'msg', b:a.b})
					})
				},
			})[a.a](a)
		})
	})
	
	cluster.on('exit', (worker, code, signal) => {
		console.log(`worker ${worker.process.pid} died`)
	})
	
} else {
	const server = 	require('net').createServer()
	server.on('connection', a=>{
		a.on('data', b=>{
			//if (b[0] != 71 && b[0] != 80) {
			//	a.end('HTTP/1.1 400 Bad Request\r\n\r\n')
			//	return
			//}
			if (isWebSocket(a,b)) return
			({
				GET: get1,
				POST: post1,
			})[b.toString('utf8', 0, b.indexOf(Buffer.from(' ')))](a,b)
		});
		
		a.once('close', ()=>{ /*console.log('connection from %s closed', remoteAddress)*/ })
		a.on('error', b=>{ console.log('Connection error: %s', b.message); console.log(b) })
	}).listen(44333, ()=> { console.log('server listening to %j', server.address()) })
}