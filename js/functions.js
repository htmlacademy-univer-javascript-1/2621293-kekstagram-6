function checkStringLength(string, maxLength) {
  const actualLength = string.length;
  if (actualLength <= maxLength) {
    return true; 
  } else {
    return false; 
  }
}

function isPalindrome(originalString) {
  const lowerString = originalString.toLowerCase();

  let reversedString = '';
  for (let i = lowerString.length - 1; i >= 0; i--) {
    reversedString += lowerString[i];
  }

  if (lowerString === reversedString) {
    return true; 
  } else {
    return false;
  }
}

// Cтрока короче 20 символов
console.log(checkStringLength('проверяемая строка', 20));// true
// Длина строки ровно 18 символов
console.log(checkStringLength('проверяемая строка', 18)); // true
// Строка длиннее 10 символов
console.log(checkStringLength('проверяемая строка', 10)); // false


// Строка является палиндромом
console.log(isPalindrome('топот')); // true
// Несмотря на разный регистр, тоже палиндром
console.log(isPalindrome('ДовОд')); // true
// Это не палиндром
console.log(isPalindrome('Кекс'));  // false

