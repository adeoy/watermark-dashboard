import React from "react";
import { connect } from "react-redux";
import { Form as BSForm, FormGroup, Input, Label } from "reactstrap";

import { formatMoney } from "../../util/index";
import { patchEmployee, setSettings } from "../../actions/index";
import { searchStaticData } from "../../util/local";

const Form = ({
  employee,
  staticData,
  settings,
  patchEmployee,
  setSettings,
}) => {
  if (!staticData.employeeTypes) {
    return <></>;
  }

  const employeeType = searchStaticData(
    staticData.employeeTypes,
    employee._id_type
  );

  const onChangeEmployee = (e) => {
    patchEmployee(employee._id, {
      [e.target.name]: e.target.value,
    });
  };

  const onChangeEmployeeType = (e) => {
    const _id_type = e.target.value;
    let _id_route = employee._id_route;

    // Si es Colaborador en el Local
    if (_id_type === "5fa80c486e76d16d62e818a3") {
      _id_route = "5f9ee46db157a32c178f2ce0"; // Entonces ruta Local
    }

    patchEmployee(employee._id, {
      _id_type,
      _id_route,
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
          onChange={onChangeEmployeeType}
        >
          {staticData.employeeTypes.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </Input>
      </FormGroup>
      {employeeType.name === "Repartidor" && (
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
      )}
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
  patchEmployee,
  setSettings,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
