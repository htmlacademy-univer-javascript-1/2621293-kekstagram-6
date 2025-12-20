const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document
  .querySelector('#picture')
  .content
  .querySelector('.picture');

const clearThumbnails = () => {
  const pictures = picturesContainer.querySelectorAll('.picture');
  pictures.forEach((picture) => picture.remove());
};

const renderThumbnails = (pictures) => {
  clearThumbnails();

  const fragment = document.createDocumentFragment();

  pictures.forEach(({ url, likes, comments, description, id }) => {
    const pictureElement = pictureTemplate.cloneNode(true);

    const imageElement = pictureElement.querySelector('.picture__img');
    imageElement.src = url;
    imageElement.alt = description;

    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.dataset.pictureId = id;

    fragment.append(pictureElement);
  });

  picturesContainer.append(fragment);
};

export { renderThumbnails };
