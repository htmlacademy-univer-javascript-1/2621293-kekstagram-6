import { debounce } from './utils.js';

const RANDOM_PICTURES_COUNT = 10;

const FilterType = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filtersElement = document.querySelector('.img-filters');
const filterButtons = filtersElement.querySelectorAll('.img-filters__button');

let currentFilter = FilterType.DEFAULT;
let pictures = [];

const sortRandomly = () => Math.random() - 0.5;
const sortByComments = (a, b) => b.comments.length - a.comments.length;

const getFilteredPictures = () => {
  switch (currentFilter) {
    case FilterType.RANDOM:
      return [...pictures]
        .sort(sortRandomly)
        .slice(0, RANDOM_PICTURES_COUNT);

    case FilterType.DISCUSSED:
      return [...pictures].sort(sortByComments);

    default:
      return [...pictures];
  }
};

const setActiveButton = (button) => {
  filterButtons.forEach((btn) =>
    btn.classList.remove('img-filters__button--active')
  );
  button.classList.add('img-filters__button--active');
};

const setOnFilterClick = (callback) => {
  filtersElement.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }

    const selectedFilter = evt.target.id;
    if (selectedFilter === currentFilter) {
      return;
    }

    currentFilter = selectedFilter;
    setActiveButton(evt.target);
    callback(getFilteredPictures());
  });
};

const initFilters = (loadedPictures, renderCallback) => {
  pictures = [...loadedPictures];
  filtersElement.classList.remove('img-filters--inactive');

  setOnFilterClick(
    debounce(renderCallback)
  );
};

export { initFilters, getFilteredPictures };
