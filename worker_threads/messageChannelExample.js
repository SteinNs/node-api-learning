const {MessageChannel} = require('worker_threads');
const channel = new MessageChannel();
channel.port3 = {...channel.port1};
console.log(channel.port3.on);
console.log(channel.port1.on);

const {port1, port2, port3} = channel;
port1.on('message', message => console.log('received', message));
// port3.on('message', message => console.log('received', message));
port2.postMessage({foo: 'bar'});
