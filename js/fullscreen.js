import { isEscapeKey } from './utils.js';

const bigPictureElement = document.querySelector('.big-picture');
const closeButton = bigPictureElement.querySelector('.big-picture__cancel');
const socialComments = bigPictureElement.querySelector('.social__comments');
const socialCommentCount = bigPictureElement.querySelector('.social__comment-count');
const commentsLoader = bigPictureElement.querySelector('.comments-loader');

// Скрываем элементы как требует задание
socialCommentCount.classList.add('hidden');
commentsLoader.classList.add('hidden');

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
  socialComments.innerHTML = '';
  const commentsFragment = document.createDocumentFragment();
  
  comments.forEach((comment) => {
    commentsFragment.appendChild(createComment(comment));
  });
  
  socialComments.appendChild(commentsFragment);
};

function openFullscreen(photo) {
  // Заполняем данные фотографии
  bigPictureElement.querySelector('.big-picture__img img').src = photo.url;
  bigPictureElement.querySelector('.big-picture__img img').alt = photo.description;
  bigPictureElement.querySelector('.likes-count').textContent = photo.likes;
  bigPictureElement.querySelector('.comments-count').textContent = photo.comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = photo.description;
  
  // Отрисовываем комментарии
  renderComments(photo.comments);
  
  // Показываем окно
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  
  document.addEventListener('keydown', onDocumentKeydown);
}

function closeFullscreen() {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

// Закрытие по крестику
closeButton.addEventListener('click', () => {
  closeFullscreen();
});

export { openFullscreen };