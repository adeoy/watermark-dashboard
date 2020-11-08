import React from "react";
import { connect } from "react-redux";
import { Form as BSForm, FormGroup, Input, Label } from "reactstrap";

import { formatMoney } from "../../util/index";
import { setEmployee, setSettings } from "../../actions/index";

const Form = ({ employee, staticData, settings, setEmployee, setSettings }) => {
  if (!staticData.employeeTypes) {
    return <></>;
  }
  const onChangeEmployee = (e) => {
    setEmployee({
      [e.target.name]: e.target.value,
    });
  };

  const onChangeForm = (e) => {
    setSettings({
      [e.target.name]: e.target.value,
    });
  };

  return (
    <BSForm>
      <FormGroup>
        <Label for="txtEmployeeName">Usuario:</Label>
        <Input
          type="text"
          name="name"
          id="txtEmployeeName"
          value={employee.name}
          onChange={onChangeEmployee}
        />
      </FormGroup>
      <FormGroup>
        <Label for="slcEmployeeType">Colaborador:</Label>
        <Input
          type="select"
          name="_id_type"
          id="slcEmployeeType"
          value={employee._id_type}
          onChange={onChangeEmployee}
        >
          {staticData.employeeTypes.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="slcEmployeeIdRoute">Ruta:</Label>
        <Input
          type="select"
          name="_id_route"
          id="slcEmployeeIdRoute"
          value={employee._id_route}
          onChange={onChangeEmployee}
        >
          {staticData.routes.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name} {formatMoney(item.gas_charge)}
            </option>
          ))}
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="slcIdOffer">Promoción:</Label>
        <Input
          type="select"
          name="_id_offer"
          id="slcIdOffer"
          value={settings._id_offer}
          onChange={onChangeForm}
        >
          <option value="">Ninguna</option>
          {staticData.offers.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="slcIdBusinessDiscount">Descuento para negocios:</Label>
        <Input
          type="select"
          name="_id_business_discount"
          id="slcIdBusinessDiscount"
          value={settings._id_business_discount}
          onChange={onChangeForm}
        >
          <option value="">Ninguna</option>
          {staticData.businessDiscounts.map((item) => (
            <option key={item._id} value={item._id}>
              -{formatMoney(item.discount)}
            </option>
          ))}
        </Input>
      </FormGroup>
    </BSForm>
  );
};

const mapStateToProps = (state) => {
  return {
    employee: state.employee,
    staticData: state.staticData,
    settings: state.settings,
  };
};

const mapDispatchToProps = {
  setEmployee,
  setSettings,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
