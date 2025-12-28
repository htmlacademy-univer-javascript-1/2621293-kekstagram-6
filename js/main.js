import { getData, sendData } from './api.js';
import { renderThumbnails } from './thumbnails.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';
import { initForm, hideModal, pristine } from './form.js';
import { setOnFormSubmit } from './form-submit.js';
import { initFilters } from './filters.js';
import { openFullscreen } from './fullscreen.js';

const showDataError = () => {
  const dataErrorTemplate = document.querySelector('#data-error');
  let errorElement;

  
  if (dataErrorTemplate) {
    errorElement = dataErrorTemplate.content.querySelector('.data-error').cloneNode(true);
  } else {

    errorElement = document.createElement('div');
    errorElement.className = 'data-error';
    errorElement.textContent = 'Ошибка загрузки данных';
    errorElement.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 60px;
      padding: 20px;
      font-size: 20px;
      text-align: center;
      background-color: #ff4e4e;
      color: #ffe753;
      z-index: 1000;
    `;
  }

  document.body.append(errorElement);


  setTimeout(() => {
    errorElement.remove();
  }, 3000);
};

const init = async () => {
  try {
    const photos = await getData();
    renderThumbnails(photos);
    initFilters(photos, (filteredPhotos) => {
      renderThumbnails(filteredPhotos);
    });

    const picturesContainer = document.querySelector('.pictures');
    picturesContainer.addEventListener('click', (evt) => {
      const pictureElement = evt.target.closest('.picture');
      if (!pictureElement) {
        return;
      }

      const pictureId = Number(pictureElement.dataset.pictureId);
      const photoData = photos.find((photo) => photo.id === pictureId);

      if (photoData) {
        openFullscreen(photoData);
      }
    });

  } catch (err) {
    showDataError();
  }
};

initForm();
init();

setOnFormSubmit(pristine, async (formData) => {
  try {
    await sendData(formData);
    hideModal();
    showSuccessMessage();
  } catch (err) {
    showErrorMessage();
  }
});
