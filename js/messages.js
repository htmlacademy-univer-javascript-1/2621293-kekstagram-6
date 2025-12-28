import { isEscapeKey } from './utils.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const bodyElement = document.body;

const removeMessage = () => {
  const messageElement = document.querySelector('.success, .error');
  if (messageElement) {
    messageElement.remove();
  }
  document.removeEventListener('keydown', onDocumentKeydown);
  bodyElement.removeEventListener('click', onBodyClick);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removeMessage();
  }
}

function onBodyClick(evt) {
  if (evt.target.closest('.success__inner, .error__inner')) {
    return;
  }
  removeMessage();
}

const showMessage = (template, buttonSelector) => {
  const messageElement = template.cloneNode(true);
  messageElement.classList.remove('hidden');

  // Ставим поверх всех элементов
  messageElement.style.position = 'fixed';
  messageElement.style.top = '0';
  messageElement.style.left = '0';
  messageElement.style.right = '0';
  messageElement.style.zIndex = '10000';

  bodyElement.append(messageElement);

  document.addEventListener('keydown', onDocumentKeydown);
  bodyElement.addEventListener('click', onBodyClick);

  messageElement
    .querySelector(buttonSelector)
    .addEventListener('click', removeMessage);
};

const showSuccessMessage = () => showMessage(successTemplate, '.success__button');
const showErrorMessage = () => showMessage(errorTemplate, '.error__button');

export { showSuccessMessage, showErrorMessage };
