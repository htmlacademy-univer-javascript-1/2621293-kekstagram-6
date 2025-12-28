import { isEscapeKey } from './utils.js';

const bigPictureElement = document.querySelector('.big-picture');
const bodyElement = document.body;
const closeButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
const commentCountElement = bigPictureElement.querySelector('.social__comment-count');
const commentsListElement = bigPictureElement.querySelector('.social__comments');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');

const COMMENTS_PER_PORTION = 5;
let commentsShown = 0;
let comments = [];

/**
 * Создание DOM-элемента одного комментария
 */
const createComment = ({ avatar, name, message }) => {
  const comment = document.createElement('li');
  comment.innerHTML = '<img class="social__picture" src="" alt="" width="35" height="35"><p class="social__text"></p>';
  comment.classList.add('social__comment');

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

/**
 * Отрисовка порции комментариев и обновление счетчика
 */
const renderComments = () => {
  commentsShown += COMMENTS_PER_PORTION;

  if (commentsShown >= comments.length) {
    commentsLoaderElement.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const comment = createComment(comments[i]);
    fragment.append(comment);
  }

  commentsListElement.innerHTML = '';
  commentsListElement.append(fragment);
  
  // ВАЖНО: Перезаписываем содержимое блока счетчика, создавая нужные спаны для тестов Cypress
  commentCountElement.innerHTML = `
    <span class="social__comment-shown-count">${commentsShown}</span> из 
    <span class="social__comment-total-count">${comments.length}</span> комментариев
  `;
};

/**
 * Обработчик клика по "Загрузить еще"
 */
const onCommentsLoaderClick = () => renderComments();

/**
 * Закрытие полноэкранного режима
 */
const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsLoaderElement.removeEventListener('click', onCommentsLoaderClick);
};

/**
 * Обработчик нажатия Esc
 */
function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

/**
 * Открытие полноэкранного режима
 */
const openFullscreen = (data) => {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  bigPictureElement.querySelector('.big-picture__img img').src = data.url;
  bigPictureElement.querySelector('.likes-count').textContent = data.likes;
  bigPictureElement.querySelector('.social__caption').textContent = data.description;

  comments = data.comments;
  commentsShown = 0;
  
  // Первая отрисовка
  renderComments();

  commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

// Обработчик кнопки закрытия (крестик)
closeButtonElement.addEventListener('click', () => {
  closeBigPicture();
});

export { openFullscreen };