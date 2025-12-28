const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

const createIdGenerator = () => {
  let lastGeneratedId = 0;
  return () => ++lastGeneratedId;
};

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

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.cssText = `
    z-index: 100;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    padding: 10px 30px;
    font-size: 16px;
    text-align: center;
    background-color: red;
    color: white;
  `;
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 5000);
};

export {
  getRandomInteger,
  getRandomArrayElement,
  isEscapeKey,
  createIdGenerator,
  debounce,
  showAlert
};
