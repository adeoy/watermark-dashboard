import React from "react";
import { Col } from "reactstrap";

import SmallStat from "./SmallStat";

import { formatMoney } from "../../util/index";

const SmallStatList = ({ sales, expenses }) => {
  const ventas = sales.reduce((acc, item) => acc + item.total_cost, 0);
  const gastos = expenses.reduce((acc, item) => acc + item.payed, 0);
  const unidades = sales.reduce((acc, item) => acc + item.units, 0);
  const baseCost = sales.reduce((acc, item) => acc + item.base_cost, 0);
  const comisiones = sales.reduce((acc, item) => acc + item.comision, 0);
  const gasCharge = sales.reduce((acc, item) => acc + item.gas_charge, 0);
  const offers = sales.reduce((acc, item) => acc + item.offer_discount, 0);
  const businessDiscounts = sales.reduce(
    (acc, item) => acc + item.business_discount,
    0
  );

  const smallStats = [
    { title: "Utilidades", value: formatMoney(ventas - gastos), color: 'primary' },
    { title: "Ventas", value: formatMoney(ventas), color: 'primary' },
    { title: "Gastos", value: formatMoney(gastos), color: 'danger' },
    { title: "Unidades", value: unidades, color: 'info' },
    { title: "Costo base", value: formatMoney(baseCost), color: 'secondary' },
    { title: "Comisiones", value: formatMoney(comisiones), color: 'success' },
    { title: "Gasolina", value: formatMoney(gasCharge), color: 'warning' },
    { title: "Ofertas", value: formatMoney(offers), color: 'danger' },
    { title: "Negocios", value: formatMoney(businessDiscounts), color: 'danger' },
  ];
  return (
    <>
      {smallStats.map((item) => (
        <Col xs="6" md="4" lg="2" className="mt-2">
          <SmallStat {...item} />
        </Col>
      ))}
    </>
  );
};

export default SmallStatList;
