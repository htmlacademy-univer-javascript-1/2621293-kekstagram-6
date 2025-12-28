import { isEscapeKey } from './utils.js';
import { initScale, resetScale } from './size.js';
import { initEffects, resetEffects } from './effects.js';

const MAX_HASHTAG_COUNT = 5;
const MAX_DESCRIPTION_LENGTH = 140;
const VALID_HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;

const ERROR_TEXT = {
  INVALID_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хэштегов`,
  NOT_UNIQUE: 'Хэштеги должны быть уникальными',
  INVALID_HASHTAG: 'Неправильный хэштег',
  DESCRIPTION_TOO_LONG: `Комментарий не может превышать ${MAX_DESCRIPTION_LENGTH} символов`,
};

const formElement = document.querySelector('.img-upload__form');
const overlayElement = formElement.querySelector('.img-upload__overlay');
const bodyElement = document.body;
const cancelButtonElement = formElement.querySelector('.img-upload__cancel');
const fileInputElement = formElement.querySelector('.img-upload__input');
const hashtagFieldElement = formElement.querySelector('.text__hashtags');
const descriptionFieldElement = formElement.querySelector('.text__description');
const previewImage = formElement.querySelector('.img-upload__preview img');
const effectsPreviews = formElement.querySelectorAll('.effects__preview');

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text',
});

const normalizeTags = (value) => value.trim().split(/\s+/).filter(Boolean);
const hasValidCount = (value) => normalizeTags(value).length <= MAX_HASHTAG_COUNT;
const hasValidTags = (value) => normalizeTags(value).every((tag) => VALID_HASHTAG.test(tag));
const hasUniqueTags = (value) => {
  const tags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return tags.length === new Set(tags).size;
};
const hasValidDescriptionLength = (value) => value.length <= MAX_DESCRIPTION_LENGTH;


function hideModal() {
  formElement.reset();
  pristine.reset();
  resetScale();
  resetEffects();
  
  overlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  
  document.removeEventListener('keydown', onDocumentKeydown);
}


function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    const isErrorMessageExists = Boolean(document.querySelector('.error'));
    
    if (isErrorMessageExists) {
      return;
    }

    const isFieldFocused = document.activeElement === hashtagFieldElement || 
                           document.activeElement === descriptionFieldElement;

    if (!isFieldFocused) {
      evt.preventDefault();
      hideModal();
    }
  }
}

const showModal = () => {
  overlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  initScale();
  initEffects();

  document.addEventListener('keydown', onDocumentKeydown);
};

const loadImage = () => {
  const file = fileInputElement.files[0];
  if (!file) {
    return;
  }

  const fileName = file.name.toLowerCase();
  const matches = ['jpg', 'jpeg', 'png'].some((it) => fileName.endsWith(it));

  if (matches) {
    const imageURL = URL.createObjectURL(file);
    previewImage.src = imageURL;
    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url(${imageURL})`;
    });
  }
};

const initForm = () => {

  pristine.addValidator(hashtagFieldElement, hasValidCount, ERROR_TEXT.INVALID_COUNT);
  pristine.addValidator(hashtagFieldElement, hasValidTags, ERROR_TEXT.INVALID_HASHTAG);
  pristine.addValidator(hashtagFieldElement, hasUniqueTags, ERROR_TEXT.NOT_UNIQUE);
  pristine.addValidator(descriptionFieldElement, hasValidDescriptionLength, ERROR_TEXT.DESCRIPTION_TOO_LONG);

  fileInputElement.addEventListener('change', () => {
    loadImage();
    showModal();
  });

  cancelButtonElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    hideModal();
  });
};

export { initForm, hideModal, formElement, pristine };