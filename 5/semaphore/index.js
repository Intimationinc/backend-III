import { Semaphore } from "async-mutex";

const semaphore = new Semaphore(3);

// Simulate an operation that takes some time
async function accessSharedResource(id) {
  const [value, release] = await semaphore.acquire();

  try {
    console.log(`Resource being accessed by: ${id}`);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(`Resource released by: ${id}`);
  } finally {
    release();
  }
}

// Simulate concurrent accesses
async function simulateSemaphoreOperations() {
  await Promise.all([
    accessSharedResource(1),
    accessSharedResource(2),
    accessSharedResource(3),
    accessSharedResource(4),
    accessSharedResource(5),
  ]);
}

simulateSemaphoreOperations();
