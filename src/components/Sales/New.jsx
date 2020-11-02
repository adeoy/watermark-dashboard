import React, { useState } from "react";
import { connect } from "react-redux";
import { Form, FormGroup, Input, Label } from "reactstrap";

import Modal from "../Wrappers/Modal";

import { formatMoney } from "../../util";
import { uploadSale } from "../../actions/index";
import {
  calcComision,
  calcRuleDiscount,
  calcOfferDiscount,
  calcGasCharge,
  priceToShow,
  searchStaticData
} from "../../util/local";

const defaultForm = {
  _id_product: "5f9ee328b157a32c178f2cd8",
  units: 0,
  pay_received: 0.0,
};

const New = ({ employee, uploadSale, staticData }) => {
  const [form, setForm] = useState(defaultForm);

  const onChangeUnits = (units) => {
    units = parseInt(units);
    if (units > 25) {
      units = 25;
    } else if (units < 0) {
      units = 0;
    }

    setForm({
      ...form,
      units,
    });
  };

  const onChangeIdProduct = (_id_product) => {
    setForm({
      ...form,
      _id_product,
    });
  };

  const onChangePayReceived = (pay_received) => {
    pay_received = parseInt(pay_received);
    if (pay_received < 0) {
      pay_received = 0;
    }

    setForm({
      ...form,
      pay_received,
    });
  };

  const employeeRoute = searchStaticData(staticData.routes, employee._id_route);
  const product = searchStaticData(staticData.products, form._id_product);
  const base_cost = form.units * product.price;
  const [offer_discount, _id_offer] = calcOfferDiscount(
    staticData.offers,
    form.units,
    product.price
  );
  const discountedUnits = offer_discount / product.price;
  const comision = calcComision(
    employee.comision,
    product.comision,
    form.units - discountedUnits
  );
  const [rule_discount, _id_rule] = calcRuleDiscount(
    staticData.pricesRules,
    employee.type,
    form.units
  );
  const gas_charge = calcGasCharge(
    product.slug,
    form.units,
    employeeRoute.gas_charge
  );
  const total_cost =
    base_cost + comision - rule_discount - offer_discount + gas_charge;
  let change = form.pay_received - total_cost;
  change = change > 0.0 ? change : 0.0;

  const submit = () => {
    const sale = {
      ...form,
      date: new Date().toISOString(),
      base_cost,
      offer_discount,
      comision,
      rule_discount,
      gas_charge,
      total_cost,
      _id_offer,
      _id_rule,
      _id_employee: employee._id,
    };
    uploadSale(sale);
    setForm(defaultForm);
  };

  return (
    <Modal
      modalTitle="Nueva Venta"
      submitTitle="Guardar"
      submit={submit}
      submitEnable={total_cost > 0 && form.pay_received >= total_cost}
    >
      <Form>
        <FormGroup>
          <Label for="slcProducts">Producto:</Label>
          <Input
            type="select"
            name="_id_product"
            id="slcProducts"
            value={form._id_product}
            onChange={(e) => onChangeIdProduct(e.target.value)}
          >
            {staticData.products.map(({ _id, name, price, comision }) => (
              <option key={_id} value={_id}>
                {name}{" "}
                {formatMoney(
                  priceToShow(
                    employee.comision,
                    employeeRoute.gas_charge,
                    price,
                    comision
                  )
                )}
              </option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="txtUnits">Unidades:</Label>
          <Input
            type="number"
            name="units"
            id="txtUnits"
            value={form.units}
            onChange={(e) => onChangeUnits(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="txtPayReceived">Pago recibido:</Label>
          <Input
            type="number"
            name="pay_received"
            id="txtPayReceived"
            value={form.pay_received}
            onChange={(e) => onChangePayReceived(e.target.value)}
          />
        </FormGroup>
      </Form>
      <p>
        Base: {formatMoney(base_cost)}
        <br />
        Offer Discount: -{formatMoney(offer_discount)}
        <br />
        Comision: +{formatMoney(comision)}
        <br />
        Rule Discount: -{formatMoney(rule_discount)}
        <br />
        Gas Charge: +{formatMoney(gas_charge)}
        <br />
        Total: {formatMoney(total_cost)}
        <br />
        Cambio: {formatMoney(change)}
        <br />
      </p>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    employee: state.employee,
    staticData: state.staticData,
  };
};

const mapDispatchToProps = {
  uploadSale,
};

export default connect(mapStateToProps, mapDispatchToProps)(New);
