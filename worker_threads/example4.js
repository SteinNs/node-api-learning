const assert = require('assert');
const {
  Worker,
  MessageChannel,
  MessagePort,
  isMainThread,
  parentPort
} = require('worker_threads');

if(isMainThread){
  const worker = new Worker(__filename);
  const subChannel = new MessageChannel();
  worker.postMessage({
    hereIsYourPort: subChannel.port1
  }, [subChannel.port1]);
  subChannel.port2.on('message', value => {
    console.log('received:', value);
  })
} else {
  parentPort.once('message', value => {
    assert(value.hereIsYourPort instanceof MessagePort);
    value.hereIsYourPort.postMessage('worker send this');
    value.hereIsYourPort.close();
  })
}