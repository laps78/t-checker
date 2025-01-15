const foundMarksDeleteInner = (arrayTiModify: object[]): object[] => {
  const arrayToReturn = [
    arrayTiModify[0],
    arrayTiModify[arrayTiModify.length - 1],
  ];
  return arrayToReturn;
};

export default foundMarksDeleteInner;
