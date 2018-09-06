const {
  Worker,
  isMainThread,
  parentPort,
  workerData
} = require('worker_threads');
const request = require('request');

if(isMainThread){
  console.log('main thread');
  let worker = new Worker(__filename, {workerData: null});
  worker.on('message', (msg) => {
    console.log(`first value is ${msg.value}`);
    console.log(`took: ${msg.timeDiff/ 1000}, seconds`);
  })
  worker.on('error', console.error);
  worker.on('exit', (code) => {
    if(code !== 0){
      console.error(new Error(`exit code ${code}`));
    }
  })
  request.get('http://www.baidu.com', (err, res) => {
    if(err){
      return console.error(err);
    }
    console.log(`bytes received ${res.body.length}`);
  })
} else {
  function random(min, max){
    return Math.random() * (max - min) + min;
  }
  const start = Date.now();
  const sorter = require('./test2-worker');
  let bigList = Array(1000000).fill().map(() => random(1, 10000));
  sorter.sort(bigList);
  parentPort.postMessage({value: sorter.firstValue, timeDiff: Date.now() - start})
}