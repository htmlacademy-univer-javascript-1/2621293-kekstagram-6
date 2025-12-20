import { openFullscreen } from './fullscreen.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

const renderThumbnails = (photos) => {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const thumbnail = pictureTemplate.cloneNode(true);

    thumbnail.querySelector('.picture__img').src = photo.url;
    thumbnail.querySelector('.picture__img').alt = photo.description;
    thumbnail.querySelector('.picture__likes').textContent = photo.likes;
    thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;

    thumbnail.dataset.photoId = photo.id;

    fragment.appendChild(thumbnail);
  });

  picturesContainer.appendChild(fragment);

  picturesContainer.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('.picture');
    if (!thumbnail) {
      return;
    }

    const photo = photos.find((item) => item.id === Number(thumbnail.dataset.photoId));
    openFullscreen(photo);
  });
};

export { renderThumbnails };
