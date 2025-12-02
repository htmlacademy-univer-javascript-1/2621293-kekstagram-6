const effectsContainer = document.querySelector('.effects');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const effectLevelInput = document.querySelector('.effect-level__value');
const imagePreview = document.querySelector('.img-upload__preview img');

const EFFECTS = {
  none: {
    filter: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: ''
  },
  chrome: {
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  sepia: {
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  marvin: {
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  phobos: {
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  heat: {
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  }
};

let currentEffect = 'none';

const createSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: EFFECTS[currentEffect].min,
      max: EFFECTS[currentEffect].max
    },
    start: EFFECTS[currentEffect].max,
    step: EFFECTS[currentEffect].step,
    connect: 'lower'
  });

  sliderElement.noUiSlider.on('update', () => {
    const sliderValue = sliderElement.noUiSlider.get();
    effectLevelInput.value = sliderValue;
    
    if (currentEffect !== 'none') {
      const effect = EFFECTS[currentEffect];
      imagePreview.style.filter = `${effect.filter}(${sliderValue}${effect.unit})`;
    }
  });
};

const updateSlider = () => {
  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
  }

  if (currentEffect === 'none') {
    sliderContainer.classList.add('hidden');
    imagePreview.style.filter = 'none';
  } else {
    sliderContainer.classList.remove('hidden');
    createSlider();
  }
};

const onEffectsChange = (evt) => {
  if (evt.target.classList.contains('effects__radio')) {
    currentEffect = evt.target.value;
    updateSlider();
  }
};

const initEffects = () => {
  sliderContainer.classList.add('hidden');
  effectsContainer.addEventListener('change', onEffectsChange);
  
  const originalEffect = document.querySelector('#effect-none');
  if (originalEffect) {
    originalEffect.checked = true;
  }
};

const resetEffects = () => {
  currentEffect = 'none';
  imagePreview.style.filter = 'none';
  sliderContainer.classList.add('hidden');
  
  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
  }

  const originalEffect = document.querySelector('#effect-none');
  if (originalEffect) {
    originalEffect.checked = true;
  }
};

export { initEffects, resetEffects };
