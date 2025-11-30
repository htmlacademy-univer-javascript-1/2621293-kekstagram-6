import { isEscapeKey } from './utils.js';

const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const ErrorText = {
  INVALID_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хэштегов`,
  NOT_UNIQUE: 'Хэштеги должны быть уникальными',
  INVALID_PATTERN: 'Неправильный хэштег'
};

const form = document.querySelector('.img-upload__form');
const overlay = form.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const cancelButton = form.querySelector('.img-upload__cancel');
const fileInput = form.querySelector('.img-upload__input');
const hashtagField = form.querySelector('.text__hashtags');
const descriptionField = form.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text'
});

const showModal = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const hideModal = () => {
  form.reset();
  pristine.reset();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const normalizeTags = (tagString) => tagString.trim().split(' ').filter((tag) => Boolean(tag.length));

const isTextFieldFocused = () => document.activeElement === hashtagField || document.activeElement === descriptionField;

const hasValidCount = (value) => normalizeTags(value).length <= MAX_HASHTAG_COUNT;

const hasValidTags = (value) => normalizeTags(value).every((tag) => VALID_SYMBOLS.test(tag));

const hasUniqueTags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isTextFieldFocused()) {
    evt.preventDefault();
    hideModal();
  }
}

const onCancelButtonClick = () => hideModal();

const onFileInputChange = () => showModal();

// Добавляем валидаторы
pristine.addValidator(
  hashtagField,
  hasValidCount,
  ErrorText.INVALID_COUNT,
  3,
  true
);

pristine.addValidator(
  hashtagField,
  hasValidTags,
  ErrorText.INVALID_PATTERN,
  2,
  true
);

pristine.addValidator(
  hashtagField,
  hasUniqueTags,
  ErrorText.NOT_UNIQUE,
  1,
  true
);

// Добавляем обработчики
fileInput.addEventListener('change', onFileInputChange);
cancelButton.addEventListener('click', onCancelButtonClick);

// Обработчик отправки формы
form.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  
  if (!isValid) {
    evt.preventDefault();
  }
});

// Инициализация формы
const initForm = () => {
  console.log('✅ Форма инициализирована');
};

// Экспортируем функцию
export { initForm };