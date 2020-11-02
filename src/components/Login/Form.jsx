import React, { useState } from "react";
import { Form as BSForm, FormGroup, Input, Label } from "reactstrap";

const Form = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const onChangeForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <BSForm>
      <FormGroup>
        <Label for="txtEmail">Correo:</Label>
        <Input
          type="email"
          name="email"
          id="txtEmail"
          value={form.email}
          onChange={onChangeForm}
        />
      </FormGroup>
      <FormGroup>
        <Label for="txtPassword">Contraseña:</Label>
        <Input
          type="password"
          name="password"
          id="txtPassword"
          value={form.password}
          onChange={onChangeForm}
        />
      </FormGroup>
    </BSForm>
  );
};

export default Form;
