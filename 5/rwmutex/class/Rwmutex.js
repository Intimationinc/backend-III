import { Mutex } from "async-mutex";

export class Rwmutex {
  constructor() {
    this.readers = 0;
    this.mutex = new Mutex();
    this.readMutex = new Mutex();
  }

  // Acquire the lock for reading
  async acquireReadLock() {
    const release = await this.readMutex.acquire();
    try {
      // Once inside, increment the reader count
      this.readers++;
      if (this.readers === 1) {
        // First reader blocks writers
        await this.mutex.acquire();
      }
    } finally {
      release();
    }
  }

  // Release the read lock
  async releaseReadLock() {
    const release = await this.readMutex.acquire();
    try {
      this.readers--;
      if (this.readers === 0) {
        // Last reader releases the write lock
        this.mutex.release();
      }
    } finally {
      release();
    }
  }

  // Acquire the lock for writing (exclusive access)
  async acquireWriteLock() {
    await this.mutex.acquire(); // Only one writer allowed at a time
  }

  // Release the write lock
  releaseWriteLock() {
    this.mutex.release();
  }
}
