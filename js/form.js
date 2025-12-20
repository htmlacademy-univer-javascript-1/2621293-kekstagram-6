import { isEscapeKey } from './utils.js';
import { initScale, resetScale } from './size.js';
import { initEffects, resetEffects } from './effects.js';

const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

const ERROR_TEXT = {
  INVALID_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хэштегов`,
  NOT_UNIQUE: 'Хэштеги должны быть уникальными',
  INVALID_PATTERN: 'Неправильный хэштег',
};

const formElement = document.querySelector('.img-upload__form');
const overlayElement = formElement.querySelector('.img-upload__overlay');
const bodyElement = document.body;
const cancelButtonElement = formElement.querySelector('.img-upload__cancel');
const fileInputElement = formElement.querySelector('.img-upload__input');
const hashtagFieldElement = formElement.querySelector('.text__hashtags');
const descriptionFieldElement = formElement.querySelector('.text__description');

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text',
});

const normalizeTags = (value) =>
  value.trim().split(' ').filter(Boolean);

const isTextFieldFocused = () =>
  document.activeElement === hashtagFieldElement ||
  document.activeElement === descriptionFieldElement;

const hasValidCount = (value) =>
  normalizeTags(value).length <= MAX_HASHTAG_COUNT;

const hasValidTags = (value) =>
  normalizeTags(value).every((tag) => VALID_SYMBOLS.test(tag));

const hasUniqueTags = (value) => {
  const tags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return tags.length === new Set(tags).size;
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !isTextFieldFocused()) {
    evt.preventDefault();
    hideModal();
  }
};

const showModal = () => {
  overlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  initScale();
  initEffects();
};

const hideModal = () => {
  formElement.reset();
  pristine.reset();
  resetScale();
  resetEffects();
  overlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const initForm = () => {
  pristine.addValidator(hashtagFieldElement, hasValidCount, ERROR_TEXT.INVALID_COUNT);
  pristine.addValidator(hashtagFieldElement, hasValidTags, ERROR_TEXT.INVALID_PATTERN);
  pristine.addValidator(hashtagFieldElement, hasUniqueTags, ERROR_TEXT.NOT_UNIQUE);

  fileInputElement.addEventListener('change', showModal);
  cancelButtonElement.addEventListener('click', hideModal);
};

export { initForm, hideModal };
