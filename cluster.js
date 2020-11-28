const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
	const cpusCount = os.cpus().length || 8;
	console.log(os.platform());
	console.log(os.freemem());
	console.log(`CPUs: ${cpusCount}`)

	for (let i = 0; i < cpusCount - 1; i++) {
		const fork = cluster.fork();
		fork.on('exit', () => cluster.fork());
	};
};

if (cluster.isWorker) {
	require('./worker.js');
};
