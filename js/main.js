import { getData, sendData } from './api.js';
import { renderThumbnails } from './thumbnails.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';
import { initForm, hideModal } from './form.js';
import { setOnFormSubmit } from './form-submit.js';
import { initFilters, getFilteredPictures } from './filters.js';
import { showAlert } from './utils.js';

const init = async () => {
  try {
    const photos = await getData();

    initFilters(photos, renderThumbnails);

    renderThumbnails(getFilteredPictures());
  } catch (err) {
    showAlert(err.message);
  }
};

init();
initForm();

setOnFormSubmit(async (formData) => {
  try {
    await sendData(formData);
    hideModal();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});
