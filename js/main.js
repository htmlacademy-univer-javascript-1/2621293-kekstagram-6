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

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

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


const photos = Array.from({length: PHOTOS_COUNT}, (_, index) => createPhoto(index));

console.log(photos);