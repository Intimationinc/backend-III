import { Rwmutex } from "./class/Rwmutex.js";

// Example Usage:
const rwMutex = new Rwmutex();

// Shared resource
let sharedData = 0;

// Read operation
async function readData() {
  await rwMutex.acquireReadLock();
  try {
    console.log("Reading data:", sharedData);
  } finally {
    rwMutex.releaseReadLock();
  }
}

// Write operation
async function writeData(newData) {
  await rwMutex.acquireWriteLock();
  try {
    sharedData = newData;
    console.log("Writing data:", sharedData);
  } finally {
    rwMutex.releaseWriteLock();
  }
}

// Simulate concurrent reads and writes
async function simulateConcurrentOperations() {
  // Concurrent reads
  Promise.all([
    writeData(2),
    readData(),
    readData(),
    readData(),
    writeData(3),
    readData(),
    readData(),
  ]);

  // Write operation after some reads
  setTimeout(async () => {
    await writeData(10);
  }, 100);

  // More reads after write
  setTimeout(async () => {
    await readData();
  }, 200);
}

simulateConcurrentOperations();
