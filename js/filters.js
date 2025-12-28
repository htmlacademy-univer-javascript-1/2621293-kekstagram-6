import { debounce } from './utils.js';

const RANDOM_PHOTOS_COUNT = 10;
const DEBOUNCE_DELAY = 500;

const filtersElement = document.querySelector('.img-filters');
const filtersForm = filtersElement.querySelector('.img-filters__form');

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

// Функция для случайного перемешивания
const sortRandomly = () => 0.5 - Math.random();

// Функция для сортировки по количеству комментариев
const sortByComments = (photoA, photoB) => photoB.comments.length - photoA.comments.length;

/**
 * Логика фильтрации данных
 */
const filterFunctions = {
  [Filter.DEFAULT]: (data) => data,
  [Filter.RANDOM]: (data) => [...data].sort(sortRandomly).slice(0, RANDOM_PHOTOS_COUNT),
  [Filter.DISCUSSED]: (data) => [...data].sort(sortByComments),
};

/**
 * Переключение активного состояния кнопок
 */
const toggleButtons = (clickedButton) => {
  const currentActiveButton = filtersForm.querySelector('.img-filters__button--active');
  if (currentActiveButton) {
    currentActiveButton.classList.remove('img-filters__button--active');
  }
  clickedButton.classList.add('img-filters__button--active');
};

/**
 * Инициализация фильтров
 */
const initFilters = (data, renderCallback) => {
  filtersElement.classList.remove('img-filters--inactive');

  // Оборачиваем функцию отрисовки в debounce
  const debouncedRender = debounce(renderCallback, DEBOUNCE_DELAY);

  filtersForm.addEventListener('click', (evt) => {
    // Ищем ближайшую кнопку (на случай клика по span внутри)
    const target = evt.target.closest('.img-filters__button');
    
    if (!target) {
      return;
    }

    // Если кликнули по уже активному фильтру — ничего не делаем
    if (target.classList.contains('img-filters__button--active')) {
      return;
    }

    // 1. Сразу переключаем кнопки (синхронно)
    toggleButtons(target);

    // 2. Получаем отфильтрованные данные
    const filteredData = filterFunctions[target.id](data);

    // 3. Вызываем отрисовку с задержкой (debounce)
    debouncedRender(filteredData);
  });
};

export { initFilters };