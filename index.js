const http = require('http');
const pid = process.pid

http
	.createServer((req, res) => {
		for(let i = 0; i < 1e7; i++) {}
		res.end('response')
	})
	.listen(3000, () => {
		console.log(`server started, pid: ${pid}`)
	});
