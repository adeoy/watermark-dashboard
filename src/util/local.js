import moment from "moment";

export const calcComision = (isComision, comision, units) => {
  if (!isComision) {
    return 0.0;
  }
  return comision * units;
};

export const calcRuleDiscount = (
  pricesRules,
  employee_type,
  units,
  product_name
) => {
  for (const rule of pricesRules) {
    if (rule.type === "min_max") {
      if (
        employee_type === rule.data.employee_type &&
        units >= rule.data.min &&
        units < rule.data.max &&
        rule.data.products_names.include(product_name)
      ) {
        return [units * rule.discount, rule._id];
      }
    }
  }

  return [0.0, null];
};

export const calcOfferDiscount = (offer, units, price) => {
  const now = moment();

  if (
    offer.date &&
    (now < moment(offer.date.from) || now > moment(offer.date.to))
  ) {
    return [0.0, 0];
  }

  let freeUnits = 0;
  if (offer.type === "axb") {
    const { get, pay } = offer.data;
    const gift = get - pay;
    const applied = Math.floor(units / get);
    freeUnits = applied * gift;
  } else if (offer.type === "xfree" && units > 0) {
    const data = offer.data;
    freeUnits = data.units;
  }
  const discount = freeUnits * price;

  return [discount >= 0.0 ? discount : 0.0, freeUnits];
};

export const calcGasCharge = (slug, units, gas_charge) => {
  if (slug === "garrafon") {
    return units * gas_charge;
  } else {
    return 0.0;
  }
};

export const searchStaticData = (data, _id) =>
  data.find((item) => item._id === _id);

export const priceToShow = (
  slug,
  price,
  isComision,
  comision,
  baseGasCharge,
  baseOfferDiscount
) => {
  comision = isComision ? comision : 0.0;
  if (slug === "garrafon") {
    return price + comision + baseGasCharge - baseOfferDiscount;
  } else {
    return price + comision;
  }
};

export const countGarrafones = (sales) => {
  if (sales.length === 0) return 0;
  return sales.reduce((acc, sale) => (
    sale.product_name === 'garrafon' ? acc + sale.units : acc), 0);
};

export const countComisiones = (sales) => {
  if (sales.length === 0) return 0;
  return sales.reduce((acc, sale) => (
    sale.employee.comision ? acc +
      sale.product_comision * sale.units -
      (sale.offerDiscount / sale.product_price) * sale.product_comision
      : acc
  ), 0);
}
