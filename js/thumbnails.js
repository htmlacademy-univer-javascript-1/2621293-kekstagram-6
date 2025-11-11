import { generatePhotos } from './data.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

const createThumbnail = (photo) => {
  const thumbnail = pictureTemplate.cloneNode(true);
  console.log('Creating thumbnail for photo:', photo);
  
  thumbnail.querySelector('.picture__img').src = photo.url;          
  thumbnail.querySelector('.picture__img').alt = photo.description;   
  thumbnail.querySelector('.picture__likes').textContent = photo.likes;        
  thumbnail.querySelector('.picture__comments').textContent = photo.comments.length; 
  
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