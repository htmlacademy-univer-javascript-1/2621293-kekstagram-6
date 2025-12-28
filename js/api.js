const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram/'; // обязательно со слэшем


const getData = async () => {
  const response = await fetch(`${BASE_URL}data`);
  if (!response.ok) {
    throw new Error(); 
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

  return response.json(); 
};

export { getData, sendData };
