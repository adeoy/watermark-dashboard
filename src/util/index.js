export const formatMoney = (value) => {
  if (value < 0) {
    return `-$${Math.abs(value).toFixed(2)}`
  } else {
    return `$${value.toFixed(2)}`
  }
};