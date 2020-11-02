import moment from "moment";

export const calcComision = (isComision, comision, units) => {
  if (!isComision) {
    return 0.0;
  }
  return comision * units;
}

export const calcRuleDiscount = (pricesRules, employee_type, units, product_name) => {
  for (const rule of pricesRules) {
    if (rule.type === 'min_max') {
      if (employee_type === rule.data.employee_type
        && units >= rule.data.min
        && units < rule.data.max
        && rule.data.products_names.include(product_name)) {
        return [units * rule.discount, rule._id];
      }
    }
  }

  return [0.0, null];
}

export const calcOfferDiscount = (offers, units, price) => {
  const now = moment();

  for (const offer of offers) {
    if (offer.type === 'axb') {
      if (now < moment(offer.date.from) || now > moment(offer.date.to)) {
        continue;
      }
      const { get, pay } = offer.data;
      const gift = get - pay;
      const discount = Math.floor(units / get) * gift * price;
      return [discount >= 0.0 ? discount : 0.0, offer._id];
    }
  }

  return [0.0, null];
}

export const calcGasCharge = (slug, units, gas_charge) => {
  if (
    slug === "garrafon"
  ) {
    return units * gas_charge;
  } else {
    return 0.0;
  }
}
export const priceToShow = (isComision, gasCharge, product_price, product_comision) => {
  const comisionToShow = isComision ? product_comision : 0.0;
  return product_price + comisionToShow + gasCharge;
}

export const searchStaticData = (data, _id) => (data.find(
  (item) => item._id === _id
));