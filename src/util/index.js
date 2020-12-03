export const formatMoney = (value) => {
  value = value || 0;
  if (value < 0) {
    return `-$${Math.abs(value).toFixed(2)}`
  } else {
    return `$${value.toFixed(2)}`
  }
};