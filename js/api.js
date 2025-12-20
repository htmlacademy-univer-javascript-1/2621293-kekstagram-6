const BASE_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

const getData = async () => {
  const response = await fetch(`${BASE_URL}/data`);
  if (!response.ok) {
    throw new Error('Ошибка загрузки данных');
  }
  return response.json();
};

const sendData = async (data) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    body: data,
  });

  if (!response.ok) {
    throw new Error('Ошибка отправки формы');
  }
};

export { getData, sendData };
