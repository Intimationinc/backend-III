import grpc
import hello_pb2
import hello_pb2_grpc
import bay_pb2
import bay_pb2_grpc


def run():
    channel = grpc.insecure_channel("localhost:50051")
    stub = hello_pb2_grpc.GreeterStub(channel)
    bayStub = bay_pb2_grpc.BayStub(channel)
    
    response = stub.SayHello(hello_pb2.HelloRequest(name="Munira"))
    print(f"Received: {response.message}")

    response2 = bayStub.sayBay(bay_pb2.BayRequest(name="Hasan"))
    print(f"Received: {response2.message}")

if __name__ == "__main__":
    run()
