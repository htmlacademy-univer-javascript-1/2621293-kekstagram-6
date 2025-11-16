import { generatePhotos } from './data.js';
import { openFullscreen } from './fullscreen.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

const createThumbnail = (photo) => {
  const thumbnail = pictureTemplate.cloneNode(true);
  
  thumbnail.querySelector('.picture__img').src = photo.url;          
  thumbnail.querySelector('.picture__img').alt = photo.description;   
  thumbnail.querySelector('.picture__likes').textContent = photo.likes;        
  thumbnail.querySelector('.picture__comments').textContent = photo.comments.length; 
  
  thumbnail.addEventListener('click', () => {
    openFullscreen(photo);
  });
  
  return thumbnail;
};

const renderThumbnails = () => {
  const photos = generatePhotos();
  const fragment = document.createDocumentFragment();
  
  photos.forEach((photo) => {
    const thumbnail = createThumbnail(photo);
    fragment.appendChild(thumbnail);
  });
  
  picturesContainer.appendChild(fragment);
};

renderThumbnails();

export { renderThumbnails };