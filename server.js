const list = {
    1:"张三",
    2:"李四",
    3:"王五"
}
const net = require("net");

const server = net.createServer((socket)=>{
    socket.on("data",function(buffer){
        //console.log(buffer)
        const seq = buffer.slice(0,2);
        const Id = buffer.readInt32BE(2);

        setTimeout(()=>{
            const res = Buffer.concat([
                seq,
                Buffer.from(list[Id])
            ])
    
            socket.write(res)
        }, 10 + Math.random() * 1000)
    })
})


server.listen(4000)