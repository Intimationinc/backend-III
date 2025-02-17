from http.server import SimpleHTTPRequestHandler, HTTPServer
import threading
import grpc
import hello_pb2
import hello_pb2_grpc
import bay_pb2
import bay_pb2_grpc

PORT = 8000

class CustomHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if  self.path == "/health":
            self.send_response(200)
            self.send_header("Content-type", "text/plain")
            self.end_headers()
            self.wfile.write(b"Python Server Health OK")
        else:
            super().do_GET()

server = HTTPServer(("0.0.0.0", PORT), CustomHandler)
print(f"Server running on http://localhost:{PORT}")
server.serve_forever()



# gRPC Server
class GreeterServicer(hello_pb2_grpc.GreeterServicer):
    def SayHello(self, request, context):
        return hello_pb2.HelloReply(message=f"Hello, {request.name}!")

class BayServicer(bay_pb2_grpc.BayServicer):
    def sayBay(self, request, context):
        return bay_pb2.BayResponse(message=f"Hello, {request.name}!", StatusCode=200)

def start_grpc_server():
    server = grpc.server(threading.ThreadPoolExecutor(max_workers=10))
    hello_pb2_grpc.add_GreeterServicer_to_server(GreeterServicer(), server)
    bay_pb2_grpc.add_BayServicer_to_server(GreeterServicer(), server)
    server.add_insecure_port("[::]:50051")
    print("gRPC Server running on http://localhost:50051")
    server.start()
    server.wait_for_termination()

# Run both servers
if __name__ == "__main__":
    threading.Thread(target=start_http_server).start()
    start_grpc_server()