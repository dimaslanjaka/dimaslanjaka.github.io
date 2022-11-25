import helper from './helper';

const f = async () => {
  try {
    throw new Error('empty');
  } catch (error) {
    return error;
  }
};
console.log('is promise', helper.isPromise(f));
helper.suppress(f).then(console.log);
