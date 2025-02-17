const http = require("http");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = "../proto/hello.proto";
const BAY_PROTO_PATH = "../proto/bay.proto";
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const helloProto = grpc.loadPackageDefinition(packageDefinition).hello;
const BayProto = grpc.loadPackageDefinition(
  protoLoader.loadSync(BAY_PROTO_PATH)
).bay;
const port = 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Node Server Health is OK!");
  } else {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello, World!");
  }
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

//grpc Server
function sayHello(call, callback) {
  callback(null, { message: `Hello, ${call.request.name}` });
}

function sayBay(call, callback) {
  callback(null, {
    message: `Good Bay, ${call.request.name}`,
    statusCode: 200,
  });
}

const grpcServer = new grpc.Server();
grpcServer.addService(helloProto.Greeter.service, { sayHello: sayHello });
grpcServer.addService(BayProto.Bay.service, { sayBay: sayBay });

grpcServer.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log("gRPC Server running on http://localhost:50051");
    grpcServer.start();
  }
);
