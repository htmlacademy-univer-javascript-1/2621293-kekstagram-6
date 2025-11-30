import { generatePhotos } from './data.js';
import { openFullscreen } from './fullscreen.js';

const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainerElement = document.querySelector('.pictures');

let photos = [];

const createThumbnail = (photo) => {
  const thumbnailElement = pictureTemplateElement.cloneNode(true);
  
  thumbnailElement.querySelector('.picture__img').src = photo.url;          
  thumbnailElement.querySelector('.picture__img').alt = photo.description;   
  thumbnailElement.querySelector('.picture__likes').textContent = photo.likes;        
  thumbnailElement.querySelector('.picture__comments').textContent = photo.comments.length; 
  
  thumbnailElement.dataset.photoId = photo.id;
  
  return thumbnailElement;
};

const onPicturesContainerClick = (evt) => {
  const thumbnailElement = evt.target.closest('.picture');
  
  if (thumbnailElement) {
    const photoId = parseInt(thumbnailElement.dataset.photoId, 10);
    const photo = photos.find((item) => item.id === photoId);
    
    if (photo) {
      openFullscreen(photo);
    }
  }
};

const renderThumbnails = () => {
  photos = generatePhotos();
  const fragment = document.createDocumentFragment();
  
  photos.forEach((photo) => {
    const thumbnailElement = createThumbnail(photo);
    fragment.appendChild(thumbnailElement);
  });
  
  picturesContainerElement.appendChild(fragment);
  picturesContainerElement.addEventListener('click', onPicturesContainerClick);
};

renderThumbnails();

export { renderThumbnails };
