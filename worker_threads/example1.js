const {
  Worker,
  isMainThread,
  parentPort,
  workerData
} = require('worker_threads');

let currentValue = 0;
let intervals = [100,1000,500];

function counter(id, i){
  console.log(`[${id}],${i}`);
  return i;
}

if(isMainThread){
  console.log('main thread');
  for(let i = 0; i < 2; i++){
    let worker = new Worker(__filename, {workerData: i});
  }
  setInterval(a => currentValue = counter(a, currentValue + 1),intervals[2], 'MainThread');

} else {
  console.log('worker thread');
  setInterval(a => currentValue = counter(a, currentValue + 1), intervals[workerData], workerData,currentValue)
}