1. Create a virtual environment and activate it:
    ```sh
    python3 -m venv venv
    source venv/bin/activate
    pip install grpcio grpcio-tools  # optional
    ```

2. Generate Python code from your `.proto` file:
    ```sh
    python3 -m grpc_tools.protoc -I../proto --python_out=. --grpc_python_out=. ../proto/todo.proto
    ```
