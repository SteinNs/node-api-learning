const {
  Worker,
  isMainThread,
  parentPort
} = require('worker_threads');

if(isMainThread){
  const ab = new ArrayBuffer(Int32Array.BYTES_PER_ELEMENT * 100);
  const ia = new Int32Array(ab);
  for(let i = 0; i< ia.length; i++){
    ia[i] = i;
  }
  console.log('main thread');
  for(let i = 0; i < 1; i++){
    let worker = new Worker(__filename);
    console.log('before transfer:', ab);
    worker.postMessage(ab);
    setTimeout(() => {
      console.log(`after transfer`,ab);
    }, 1000)
  } 
} else {
  parentPort.on('message', message => {
    console.log('worker thread ab',message)
  })
  console.log('worker thread')
}