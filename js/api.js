const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram/'; // обязательно со слэшем

// Получение данных
const getData = async () => {
  const response = await fetch(`${BASE_URL}data`);
  if (!response.ok) {
    throw new Error(); // Обязательно кидаем ошибку, чтобы попасть в catch
  }
  return response.json();
};

// Отправка формы
const sendData = async (data) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    body: data, // FormData, content-type не ставим
  });

  if (!response.ok) {
    throw new Error('Ошибка отправки формы');
  }

  return response.json(); // Cypress может ждать body
};

export { getData, sendData };
