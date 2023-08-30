export const impactCalculator = (
  normalizedImpact: number,
  investAmount: number
): number => {
  let number = (normalizedImpact * investAmount) / 1000000;
  return Number(number.toFixed(1));
};

export const calculateYearsPassed = (providedDate: Date): number => {
  let currentDate = new Date();
  // const providedDateObj = new Date(providedDate);
  let difference = currentDate.getTime() - providedDate.getTime();
  let days = Math.floor(difference / (1000 * 60 * 60 * 24));
  let years = days / 365.25;
  return Number(years.toFixed(2));
};

export const getNumberBasedOnRange = (propsNumber: number): number => {
  if (propsNumber >= -1 && propsNumber <= 1) {
    return 0.125;
  } else if (
    (propsNumber >= 1 && propsNumber <= 10) ||
    (propsNumber >= -10 && propsNumber <= -1)
  ) {
    return 1;
  } else if (
    (propsNumber > 10 && propsNumber <= 50) ||
    (propsNumber >= -50 && propsNumber <= -10)
  ) {
    return 5;
  } else if (
    (propsNumber > 50 && propsNumber <= 100) ||
    (propsNumber > -100 && propsNumber <= -50)
  ) {
    return 10;
  } else if (
    (propsNumber > 100 && propsNumber <= 500) ||
    (propsNumber > -500 && propsNumber <= -100)
  ) {
    return 50;
  } else if (
    (propsNumber > 500 && propsNumber <= 1000) ||
    (propsNumber > -1000 && propsNumber <= -500)
  ) {
    return 100;
  } else if (
    (propsNumber > 1000 && propsNumber <= 5000) ||
    (propsNumber > -5000 && propsNumber <= -1000)
  ) {
    return 500;
  } else if (
    (propsNumber > 5000 && propsNumber <= 10000) ||
    (propsNumber > -10000 && propsNumber <= -5000)
  ) {
    return 1000;
  } else if (
    (propsNumber > 10000 && propsNumber <= 50000) ||
    (propsNumber > -50000 && propsNumber <= -10000)
  ) {
    return 5000;
  } else if (
    (propsNumber > 50000 && propsNumber <= 100000) ||
    (propsNumber > -100000 && propsNumber <= -50000)
  ) {
    return 10000;
  } else {
    return 20000;
  }
};
