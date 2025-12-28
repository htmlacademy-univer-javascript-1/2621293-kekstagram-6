const SUBMIT_BUTTON_DELAY = 50;

const formElement = document.querySelector('.img-upload__form');
const submitButton = formElement.querySelector('.img-upload__submit');

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Опубликовываю...',
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const setOnFormSubmit = (pristine, onSubmit) => {
  formElement.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    if (!pristine.validate()) {
      return;
    }

    blockSubmitButton();

    try {
      const formData = new FormData(evt.target);
      await onSubmit(formData);
    } finally {
      setTimeout(unblockSubmitButton, SUBMIT_BUTTON_DELAY);
    }
  });
};

export { setOnFormSubmit };
