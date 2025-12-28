const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

const debounce = (callback, delay = 500) => {
  let timeoutId = null;

  return (...args) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      callback(...args);
      timeoutId = null;
    }, delay);
  };
};

export {
  getRandomInteger,
  getRandomArrayElement,
  isEscapeKey,
  debounce,
};
