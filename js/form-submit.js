const formElement = document.querySelector('.img-upload__form');

const setOnFormSubmit = (callback) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(formElement);
    callback(formData);
  });
};

export { setOnFormSubmit };
