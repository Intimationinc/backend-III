package main

import (
	"fmt"
	"sync"
	"time"
)

type Counter struct {
	value int
	mu    sync.RWMutex // Read-Write Mutex
}

func (c *Counter) Read() int {
	c.mu.RLock()
	defer c.mu.RUnlock()
	time.Sleep(time.Millisecond)
	return c.value
}

func (c *Counter) Increment() {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.value++
	time.Sleep(time.Millisecond) // Simulate delay
}

func (c *Counter) Decrement() {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.value--
	time.Sleep(time.Millisecond)
}

func main() {
	counter := Counter{}
	var wg sync.WaitGroup

	for i := 0; i < 5; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			fmt.Println("Read Value:", counter.Read())
		}()
	}

	// Launching multiple writers cause unexpected behavior with 0 and -1
	// for i := 0; i < 5; i++ {
	// 	wg.Add(2)
	// 	go func() {
	// 		counter.Increment()
	// 		wg.Done()
	// 	}()
	// 	go func() {
	// 		counter.Decrement()
	// 		wg.Done()
	// 	}()
	// }
	// Single writer
	wg.Add(1)
	go func() {
		defer wg.Done()
		counter.Increment()
	}()

	wg.Wait()
	fmt.Println("Final Counter Value (With RWMutex):", counter.value) // Always 0 (Correct)
}
