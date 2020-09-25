const listIds = [1,2,3];

const net = require("net")
const socket = new net.Socket({});

socket.connect({
    host:"127.0.0.1",
    port:4000
})

let seq = 0,buffer,id=0;

function encode(id){
    buffer = Buffer.alloc(6);
    buffer.writeInt16BE(seq++);
    buffer.writeInt32BE(listIds[id],2);
    return buffer;
}

socket.on("data",function(buf){
    const seq = buf.slice(0,2);
    const name = buf.slice(2);
    console.log(seq.readInt16BE(),'==============',name.toString());   
})

setInterval(()=>{
    id = Math.floor(Math.random() * listIds.length);
    socket.write(encode(id));
},500)

// for(let i =0; i<100; i++){//由于tcp底层运行机制会自动进行优化，所以多次并发请求会出现tcp粘包现象
//     id = Math.floor(Math.random() * listIds.length);
//     socket.write(encode(id));
// }