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
