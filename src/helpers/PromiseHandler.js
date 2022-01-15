export const PromiseHandler = promise =>
  promise.then(data => [null, data]).catch(err => [err]);
