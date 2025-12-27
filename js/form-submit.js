import { formElement } from './form.js';

const setOnFormSubmit = (callback) => {
  if (!formElement) return;

  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(formElement);
    callback(formData);
  });
};

export { setOnFormSubmit };
