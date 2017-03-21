export default function errorCatcherFactory(fn) {

  return function errorCatcher(req, res, next) {

    const result = fn(req, res);
    if (result && result.catch) {
      result.catch(next);
    }

  }
}