const http = require('http');
const pid = process.pid

const server = http
	.createServer((req, res) => {
		for(let i = 0; i < 1e7; i++) {}
		res.end('response')
	})
	.listen(3000, () => {
		console.log(`server started, pid: ${pid}`)
	});

process.on('SIGTERM', () => {
	server.close(() => process.exit(0));
});

process.on('SIGINT', () => {
	server.close(() => process.exit(0));
});

process.on('SIGUSR2', () => {
	server.close(() => process.exit(1));
});
