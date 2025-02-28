const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require('path');
const PROTO_PATH = path.resolve(__dirname, "../proto/todo.proto");
const packageDef = protoLoader.loadSync(PROTO_PATH, {});
const grpcObjects = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObjects.todoPackage;

const client = new todoPackage.Todo("localhost:40000", grpc.credentials.createInsecure());


client.createTodo({
    "id":-1,
    "text": "laundry"
}, (err, response)=>{
    // console.log(err);
    console.log("createTodo", JSON.stringify(response));
});

client.readTodos({}, (err, response)=>{
    console.log("readTodos", JSON.stringify(response));
    if(response.items){
        response.items.forEach(item => {
            console.log(item.text);
        });
    }
})

const call = client.readStreamTodos()

call.on("data", (item)=>{
    console.log("receives item from server", JSON.stringify(item));
});

call.on("end", e=> console.log("server done"));