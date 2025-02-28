import grpc
import todo_pb2
import todo_pb2_grpc

def create_todo(stub, text):
    response = stub.createTodo(todo_pb2.TodoItem(id=-1, text=text))
    print("createTodo Response:", response)

def read_todos(stub):
    response = stub.readTodos(todo_pb2.Void())
    print("readTodos Response:")
    for item in response.items:
        print(f"ID: {item.id}, Text: {item.text}")

def read_stream_todos(stub):
    call = stub.readStreamTodos(todo_pb2.Void())
    print("Streaming Todos:")
    for item in call:
        print(f"Received Item - ID: {item.id}, Text: {item.text}")

def main():
    channel = grpc.insecure_channel('localhost:40000')
    stub = todo_pb2_grpc.TodoStub(channel)
    
    create_todo(stub, "Buy groceries")
    read_todos(stub)
    read_stream_todos(stub)

if __name__ == "__main__":
    main()