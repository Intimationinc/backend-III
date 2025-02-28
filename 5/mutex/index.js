import { mutex } from "../config/package.js";

async function blockedCode(params) {
  const release = await mutex.acquire();
  try {
    console.log("Critical section is locked for - " + params);
    await new Promise((resolve) => setTimeout(resolve, 2000));
  } finally {
    console.log("Critical section is unlocked");
    release();
  }
}

async function init() {
  await Promise.all([blockedCode(1), blockedCode(2), blockedCode(3)]);
}

init();
