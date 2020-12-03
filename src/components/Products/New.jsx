import React from "react";
import { connect } from "react-redux";
import { Form, FormGroup, Input, Label } from "reactstrap";

import Modal from "../Wrappers/Modal";

import { formatMoney } from "../../util";
import { uploadSale, putSale } from "../../actions/index";
import {
  calcComision,
  //calcRuleDiscount,
  calcOfferDiscount,
  calcGasCharge,
  searchStaticData,
  priceToShow,
} from "../../util/local";


const New = ({ form, setForm, defaultForm, employee, settings, uploadSale, putSale, staticData, modalOpen, setModalOpen }) => {

  const product = searchStaticData(staticData.products, form._id_product);
  if (!product) {
    return (<></>);
  }

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
  const employeeType = searchStaticData(staticData.employeeTypes, employee._id_type);
  const {_id_offer, _id_business_discount} = settings;


  const baseGasCharge = employeeRoute.gas_charge;
  let baseOfferDiscount = 0.0;

  const base_cost = form.units * product.price;

  let [offer_discount, offeredUnits] = [0.0, 0];
  if (_id_offer) {
    const offer = searchStaticData(staticData.offers, _id_offer);
    const data = calcOfferDiscount(
      offer,
      form.units,
      product.price
    );
    offer_discount = data[0];
    offeredUnits = data[1];
  }

  const realUnits = form.units - offeredUnits;

  let business_discount = 0.0;
  if (_id_business_discount) {
    const offer = searchStaticData(staticData.businessDiscounts, _id_business_discount);
    business_discount = offer.discount * realUnits;
    baseOfferDiscount = offer.discount;
  }

  const comision = calcComision(
    employeeType.comision,
    product.comision,
    realUnits
  );
  /*const [rule_discount, _id_rule] = calcRuleDiscount(
    staticData.pricesRules,
    employee.type,
    form.units
  );*/
  const gas_charge = calcGasCharge(
    product.slug,
    realUnits,
    employeeRoute.gas_charge
  );
  const total_cost =
    base_cost + comision /*- rule_discount*/ - offer_discount + gas_charge - business_discount;
  let change = form.pay_received - total_cost;
  change = change > 0.0 ? change : 0.0;

  const submit = () => {
    const sale = {
      ...form,
      date: new Date().toISOString(),
      base_cost,
      offer_discount,
      business_discount,
      comision,
      //rule_discount,
      gas_charge,
      total_cost,
      _id_offer,
      //_id_rule,
      _id_business_discount,
      _id_employee: employee._id,
    };
    if (sale._id) {
      putSale(sale);
    } else {
      uploadSale(sale);
    }
    setForm(defaultForm);
  };

  const submitEnable = total_cost > 0 && form.pay_received >= total_cost;

  return (
    <Modal
      modalTitle="Nueva Venta"
      submitTitle="Guardar"
      submit={submit}
      submitEnable={submitEnable}
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
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
            {staticData.products.map(({ slug, _id, name, price, comision }) => (
              <option key={_id} value={_id}>
                {name}{" "}
                {formatMoney(priceToShow(slug, price, employeeType.comision, comision, baseGasCharge, baseOfferDiscount))}
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
        Business Discount: -{formatMoney(business_discount)}
        <br />
        Comision: +{formatMoney(comision)}
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
    settings: state.settings,
    staticData: state.staticData,
  };
};

const mapDispatchToProps = {
  uploadSale,
  putSale,
};

export default connect(mapStateToProps, mapDispatchToProps)(New);
