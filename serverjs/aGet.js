const mime = a => ({
	js: 'application/javascript',
	json: 'application/json',
	html: 'text/html; charset=UTF-8',
	css: 'text/css',
	svg: 'image/svg+xml',
	png: 'image/png',
})[a.match(/[^\.]*?((?=\?)|$)/)[0].toLowerCase()]

const defaultHead = (a,b) => Buffer.from(`HTTP/1.1 200 OK
Cache-Control: max-age=0, no-store, must-revalidate
Expires: 0
Content-type: ${mime(a)}
Content-Length: ${b}

`)
const fs = require('fs')

module.exports = (a,b) => {
	b = b.toString('utf8', 0, b.indexOf(Buffer.from('\r\n'))).split(' ')[1].substring(1)
	b == '' && (b = 'index.html')
	try {
		const c = fs.readFileSync(`web/${b}`)
		a.write(defaultHead(b, c.length))
		a.end(c)
	} catch (b) {
		a.end('HTTP/1.1 404 Not found')
	}
}