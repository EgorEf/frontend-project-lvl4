/* eslint-disable functional/no-let */

const getTextByNumOfEntities = (num, textForms) => {
  const n = num % 10;
  const isExceptionNum = (num > 10 && num < 15);
  const [text1, text2, text3] = textForms;
  let entityText = '';

  if (n === 1 && !isExceptionNum) {
    entityText = text1;
  } else if ((n > 1 && n < 5) && !isExceptionNum) {
    entityText = text2;
  } else {
    entityText = text3;
  }

  return `${num} ${entityText}`;
};

export default getTextByNumOfEntities;
