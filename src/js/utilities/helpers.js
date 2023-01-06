import { timeout_second } from './configuration';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([timeout(timeout_second), fetch(url)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    return data;
  } catch (err) {
    throw err;
  }
};

export function hidingSpinner(className, parentElement) {
  className.render(true, parentElement);
}

export function returnHash(windowObject) {
  windowObject.location.hash.substring(1);
}
