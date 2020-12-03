import React from "react";
import { connect } from "react-redux";
import { Form, FormGroup, Input, Label } from "reactstrap";

import Modal from "../Wrappers/Modal";

import { uploadExpense, putExpense } from "../../actions/index";

const New = ({
  form,
  setForm,
  defaultForm,
  uploadExpense,
  putExpense,
  expenseTypes,
  modalOpen,
  setModalOpen,
}) => {
  const onChangeIdExpenseType = (_id_expense_type) => {
    setForm({
      ...form,
      _id_expense_type,
    });
  };

  const onChangeDescription = (description) => {
    setForm({
      ...form,
      description,
    });
  };

  const onChangePayed = (payed) => {
    if (payed < 0) {
      payed = 0;
    }
    setForm({
      ...form,
      payed,
    });
  };

  const onChangeDate = (date) => {
    setForm({
      ...form,
      date,
    });
  };

  const submit = () => {
    if (form._id) {
      putExpense(form);
    } else {
      uploadExpense(form);
    }
    setForm(defaultForm);
  };

  const submitEnable =
    form._id_expense_type.length > 0 &&
    form.description.length > 0 &&
    form.payed > 0.0;

  return (
    <Modal
      modalTitle="Nuevo gasto"
      submitTitle="Guardar"
      submit={submit}
      submitEnable={submitEnable}
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
    >
      <Form>
        <FormGroup>
          <Label for="slcExpenseType">Tipo de gasto:</Label>
          <Input
            type="select"
            name="_id_expense_type"
            id="slcExpenseType"
            value={form._id_product}
            onChange={(e) => onChangeIdExpenseType(e.target.value)}
          >
            <option value="">Elija un tipo de gasto</option>
            {expenseTypes.map(({ _id, name }) => (
              <option key={_id} value={_id}>
                {name}
              </option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="txtDescription">Descripción:</Label>
          <Input
            name="description"
            id="txtDescription"
            value={form.description}
            onChange={(e) => onChangeDescription(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="txtPayed">Gasto:</Label>
          <Input
            type="number"
            name="payed"
            id="txtPayed"
            value={form.payed}
            onChange={(e) => onChangePayed(parseFloat(e.target.value))}
          />
        </FormGroup>
        <FormGroup>
          <Label for="txtDate">Fecha:</Label>
          <Input
            type="date"
            name="date"
            id="txtDate"
            value={form.date}
            onChange={(e) => onChangeDate(e.target.value)}
          />
        </FormGroup>
      </Form>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    expenseTypes: state.staticData.expenseTypes,
  };
};

const mapDispatchToProps = {
  uploadExpense,
  putExpense,
};

export default connect(mapStateToProps, mapDispatchToProps)(New);
