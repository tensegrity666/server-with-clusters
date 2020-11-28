const cluster = require('cluster');
const os = require('os');

const DEFAULT_CPU_COUNT_FOR_MOBILES = 4;

if (cluster.isMaster) {
	const cpusCount = os.cpus().length || DEFAULT_CPU_COUNT_FOR_MOBILES;
	console.log(os.platform());
	console.log(os.freemem());
	console.log(`CPUs: ${cpusCount}`)

	for (let i = 0; i < cpusCount - 1; i++) {
		cluster.fork();	
	}

	cluster.on('exit', (worker, code) => {
		console.log(`Worker ${worker.process.pid} was killed`);
		if (code !== 0) {
			cluster.fork();
		}
	});
};

if (cluster.isWorker) {
	require('./worker.js');
};
