const sharedBuffer = new SharedArrayBuffer(40);
const counter = new Int32Array(sharedBuffer);

function load() {
  console.log(Atomics.load(counter, 0));
}

await Promise.all([
  Atomics.add(counter, 0, 10),
  load(),
  Atomics.add(counter, 0, 10),
  Atomics.add(counter, 0, 1),
  load(),
  Atomics.add(counter, 0, 1),
]);

console.log({ counter });
