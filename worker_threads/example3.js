const {
  Worker,
  isMainThread,
  parentPort,
  workerData
} = require('worker_threads');
const request = require('request');



function startWorker(path, cb){
  let worker = new Worker(path,{workerData: null});
  worker.on('message',msg => {
    cb(null,msg)
  });
  worker.on('error', cb);
  worker.on('exit', code => {
    if(code !== 0){
      console.error(new Error(`exit code ${code}`))
    }  
  })
  return worker;
}

console.log('main thread');

let myWorker = startWorker(__dirname + '/workerCode.js', (err, result) => {
  if(err){
    return console.error(err);
  }
  console.log('first value is',result.value);
  console.log('took:',(result.timeDiff/ 1000));
})

const start = Date.now();
request.get('http://www.baidu.com', (err, res) => {
  if(err){
    return console.error(err);
  }
  console.log('bytes:',res.body.length)
})