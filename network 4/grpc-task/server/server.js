const grpc = require("@grpc/grpc-js");
const path = require('path');
const protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = path.resolve(__dirname, "../proto/todo.proto");
const packageDef = protoLoader.loadSync(PROTO_PATH, {});
const grpcObjects = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObjects.todoPackage;
const server = new grpc.Server();

server.bindAsync("0.0.0.0:40000", grpc.ServerCredentials.createInsecure(),  (err, port) => {
    if (err) {
        console.error("Failed to bind server:", err);
        return;
    }
    console.log(`gRPC Server running on port ${port}`);
}
);

server.addService(todoPackage.Todo.service,
    {
        "createTodo": createTodo,
        "readTodos": readTodos,
        "readStreamTodos":readStreamTodos
    }
);

const todos = []
function createTodo(call, callback){
console.log(call.request.text);
const todoItem = {
    "id": todos.length+1,
    "text": call.request.text
}
todos.push(todoItem);
callback(null, todoItem);
}

function readTodos(call, callback){
    callback(null, {"items":todos});
}

function readStreamTodos(call, callback) {
    todos.forEach(item=>call.write(item));
    call.end();
}