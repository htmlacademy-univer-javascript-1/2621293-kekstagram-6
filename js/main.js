import { getData, sendData } from './api.js';
import { renderThumbnails } from './thumbnails.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';
import { initForm, hideModal } from './form.js';
import { setOnFormSubmit } from './form-submit.js';
import { initFilters, getFilteredPictures } from './filters.js';
import { showAlert } from './utils.js';
import { openFullscreen } from './fullscreen.js';

const init = async () => {
  try {
    const photos = await getData();

    initFilters(photos, renderThumbnails);
    renderThumbnails(getFilteredPictures());

    const picturesContainer = document.querySelector('.pictures');
    picturesContainer.addEventListener('click', (evt) => {
      const pictureElement = evt.target.closest('.picture');
      if (!pictureElement) {
        return;
      }

      const pictureId = Number(pictureElement.dataset.pictureId);
      const photoData = getFilteredPictures().find((p) => p.id === pictureId);
      if (photoData) {
        openFullscreen(photoData);
      }
    });

  } catch (err) {
    showAlert(err.message);
  }
};

initForm();
init();

setOnFormSubmit(async (formData) => {
  try {
    await sendData(formData);
    hideModal();
    showSuccessMessage();
  } catch (err) {
    showErrorMessage();
  }
});
