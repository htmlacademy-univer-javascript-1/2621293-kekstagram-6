import { formElement, pristine, submitButton } from './form.js';

const setOnFormSubmit = (callback) => {
  formElement.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      submitButton.disabled = true;
      try {
        await callback(new FormData(formElement));
      } finally {
        submitButton.disabled = false;
      }
    }
  });
};

export { setOnFormSubmit };
