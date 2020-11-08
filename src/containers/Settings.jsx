import React from "react";
import { Col, Row } from "reactstrap";
import Form from "../components/Settings/Form";

const Settings = () => {
  return (
    <Row>
      <Col xs="12" md="6" lg="4" xl="3">
        <Form />
      </Col>
    </Row>
  );
};

export default Settings;
