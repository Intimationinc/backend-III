import threading

class Counter:
    def __init__(self):
        self.value = 0
        self.lock = threading.Lock()

    def increment(self):
        with self.lock:
            self.value += 1

    def decrement(self):
        with self.lock:
            self.value -= 1

counter = Counter()

def task():
    for _ in range(100000):
        counter.increment()
    for _ in range(100000):
        counter.decrement()

threads = []
for _ in range(5):
    t = threading.Thread(target=task)
    t.start()
    threads.append(t)

for t in threads:
    t.join()

print(f"Final Counter Value (With Lock): {counter.value}")  # Always 0 (Correct)
