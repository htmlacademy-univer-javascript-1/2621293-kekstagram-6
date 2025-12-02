import { isEscapeKey } from './utils.js';

const bigPictureElement = document.querySelector('.big-picture');
const closeButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
const socialCommentsElement = bigPictureElement.querySelector('.social__comments');
const socialCommentCountElement = bigPictureElement.querySelector('.social__comment-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');

const COMMENTS_STEP = 5;
let currentComments = [];
let commentsShown = 0;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullscreen();
  }
};

const createComment = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const commentImage = document.createElement('img');
  commentImage.classList.add('social__picture');
  commentImage.src = comment.avatar;
  commentImage.alt = comment.name;
  commentImage.width = 35;
  commentImage.height = 35;

  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentText.textContent = comment.message;

  commentElement.appendChild(commentImage);
  commentElement.appendChild(commentText);

  return commentElement;
};

const renderComments = () => {
  socialCommentsElement.innerHTML = '';
  const commentsToRender = currentComments.slice(0, commentsShown);
  const commentsFragment = document.createDocumentFragment();

  commentsToRender.forEach((comment) => {
    commentsFragment.appendChild(createComment(comment));
  });

  socialCommentsElement.appendChild(commentsFragment);

  socialCommentCountElement.innerHTML = `${commentsShown} из <span class="comments-count">${currentComments.length}</span> комментариев`;

  if (commentsShown >= currentComments.length) {
    commentsLoaderElement.classList.add('hidden');
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }
};

const onCommentsLoaderClick = () => {
  commentsShown = Math.min(commentsShown + COMMENTS_STEP, currentComments.length);
  renderComments();
};

function openFullscreen(photo) {
  commentsShown = Math.min(COMMENTS_STEP, photo.comments.length);
  currentComments = photo.comments;

  bigPictureElement.querySelector('.big-picture__img img').src = photo.url;
  bigPictureElement.querySelector('.big-picture__img img').alt = photo.description;
  bigPictureElement.querySelector('.likes-count').textContent = photo.likes;
  bigPictureElement.querySelector('.comments-count').textContent = photo.comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = photo.description;

  renderComments();

  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);
}

function closeFullscreen() {
  commentsShown = 0;
  currentComments = [];

  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  commentsLoaderElement.removeEventListener('click', onCommentsLoaderClick);
}

closeButtonElement.addEventListener('click', () => {
  closeFullscreen();
});

export { openFullscreen };
