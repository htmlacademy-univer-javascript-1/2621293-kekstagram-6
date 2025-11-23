import { isEscapeKey } from './utils.js';

const bigPictureElement = document.querySelector('.big-picture');
const closeButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
const socialCommentsElement = bigPictureElement.querySelector('.social__comments');
const socialCommentCountElement = bigPictureElement.querySelector('.social__comment-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');

socialCommentCountElement.classList.add('hidden');
commentsLoaderElement.classList.add('hidden');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullscreen();
  }
};

const createComment = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');
  
  commentElement.innerHTML = `
    <img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
    <p class="social__text">${comment.message}</p>
  `;
  
  return commentElement;
};

const renderComments = (comments) => {
  socialCommentsElement.innerHTML = '';
  const commentsFragment = document.createDocumentFragment();
  
  comments.forEach((comment) => {
    commentsFragment.appendChild(createComment(comment));
  });
  
  socialCommentsElement.appendChild(commentsFragment);
};

function openFullscreen(photo) {
  bigPictureElement.querySelector('.big-picture__img img').src = photo.url;
  bigPictureElement.querySelector('.big-picture__img img').alt = photo.description;
  bigPictureElement.querySelector('.likes-count').textContent = photo.likes;
  bigPictureElement.querySelector('.comments-count').textContent = photo.comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = photo.description;
 
  renderComments(photo.comments);
 
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  
  document.addEventListener('keydown', onDocumentKeydown);
}

function closeFullscreen() {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

closeButtonElement.addEventListener('click', () => {
  closeFullscreen();
});

export { openFullscreen };
