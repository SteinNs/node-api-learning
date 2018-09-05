const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if(cluster.isMaster){
  console.log(`main process ${process.pid} working`);
  for(let i =0; i < numCPUs; i++){
    cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker process ${worker.process.pid} exit`)
  })
} else {
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('hello world');
  }).listen(8000);
  console.log(`worker process ${process.pid} start`)
}