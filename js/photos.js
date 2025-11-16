import { getRandomInteger, getRandomArrayElement } from './utils.js';
import { DESCRIPTIONS, MESSAGES, NAMES, MAX_COMMENTS } from './consts.js';

const createComment = () => ({
  id: getRandomInteger(1, 1000),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const createPhoto = (index) => ({
  id: index + 1,
  url: `./photos/${index + 1}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: getRandomInteger(0, MAX_COMMENTS)}, createComment)
});

export { createComment, createPhoto };