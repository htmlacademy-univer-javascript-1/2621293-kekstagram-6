import { createPhoto } from './photos.js';
import { PHOTOS_COUNT } from './consts.js';

const generatePhotos = () => Array.from({length: PHOTOS_COUNT}, (_, index) => createPhoto(index));

export { generatePhotos };