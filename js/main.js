import { getData, sendData } from './api.js';
import { renderThumbnails } from './thumbnails.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';
import { initForm, hideModal } from './form.js';
import { setOnFormSubmit } from './form-submit.js';

initForm();

const loadPhotos = async () => {
  try {
    const photos = await getData();
    renderThumbnails(photos);
  } catch (err) {
    alert(err.message);
  }
};

loadPhotos();

setOnFormSubmit(async (formData) => {
  try {
    await sendData(formData);
    hideModal();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});
