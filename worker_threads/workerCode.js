const {
  parentPort
} = require('worker_threads');

function random(min, max){
  return Math.random()* (max-min) + min;
}

const sorter = require('./test2-worker');
const start = Date.now();

let bigList = Array(1000000).fill().map(() => random(1, 10000));
sorter.sort(bigList);
parentPort.postMessage({value: sorter.firstValue, timeDiff: Date.now() - start});