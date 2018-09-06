const {
  Worker,
  isMainThread,
  MessageChannel,
  MessagePort,
  parentPort
} = require('worker_threads');

if(isMainThread){
  const sab = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT * 5);
  const ia = new Int32Array(sab);
  console.log(MessageChannel);
  console.log(MessagePort);
  console.log(new MessageChannel());
  console.log(new MessagePort());
  for(let i = 0; i < ia.length; i++){
    ia[i] = i;
  }
  for(let i = 0; i < 2; i++){
    let worker = new Worker(__filename);
    worker.postMessage(sab);
    worker.on('message', () => {
      console.log(ia)
    })
  }
} else {
  parentPort.on('message', value => {
    const ia = new Int32Array(value, 0 ,1);
    ia[0]++;
    parentPort.postMessage('done');
  })
}