import { getRandomInteger, getRandomArrayElement } from './utils.js';

const DESCRIPTIONS = [
  'Красивое фото',
  'Отличный день для съемки', 
  'Незабываемые впечатления',
  'Прекрасный вид',
  'Момент, который стоит запомнить'
];

const NAMES = [
  'Артём',
  'Мария', 
  'Дмитрий',
  'Анна',
  'Сергей',
  'Екатерина'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.'
];

const PHOTOS_COUNT = 25;
const MAX_COMMENTS = 30;

const createComment = () => ({
  id: getRandomInteger(1, 1000),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const createPhoto = (index) => ({
  id: index + 1,
  url: `photos/${index + 1}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: getRandomInteger(0, MAX_COMMENTS)}, createComment)
});


const generatePhotos = Array.from({length: PHOTOS_COUNT}, (_, index) => createPhoto(index));

export { generatePhotos };