import { hideModal } from './form.js';
import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';

const formElement = document.querySelector('.img-upload__form');

const setOnFormSubmit = (callback) => {
  formElement.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const formData = new FormData(formElement);

    try {
      await callback(formData);
    } catch {
      showErrorMessage();
    }
  });
};

export { setOnFormSubmit };
