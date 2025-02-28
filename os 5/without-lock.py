import threading

class Counter:
    def __init__(self):
        self.value = 0

    def increment(self):
        temp = self.value 
        temp += 1
        self.value = temp

    def decrement(self):
        temp = self.value
        temp -= 1
        self.value = temp

counter = Counter()

def task():
    for _ in range(100000):
        counter.increment()
    for _ in range(100000):
        counter.decrement()

# Running threads
threads = []
for _ in range(30):
    t = threading.Thread(target=task)
    t.start()
    threads.append(t)

for t in threads:
    t.join()

print(f"Final Counter Value (Without Lock): {counter.value}")  # Expected: 0, but may be incorrect, though here rsult matched
