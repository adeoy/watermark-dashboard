import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Button, Col, Row } from "reactstrap";

import New from "../components/Sales/New";
import Data from "../components/Sales/Data";

const defaultForm = {
  _id_product: "5f9ee328b157a32c178f2cd8",
  units: 0,
  pay_received: 0.0,
};

const Sales = () => {
  const [form, setForm] = useState(defaultForm);
  const [modalOpen, setModalOpen] = useState(false);

  const nuevaVenta = () => {
    setModalOpen(true);
    setForm(defaultForm);
  }

  return (
    <div>
      <New form={form} setForm={setForm} defaultForm={defaultForm} modalOpen={modalOpen} setModalOpen={setModalOpen} />

      <Row className="mb-4">
        <Col xs="12" md={{ size: 4, offset: 8 }} lg={{ size: 2, offset: 10 }}>
          <Button color="success" onClick={nuevaVenta} block>
            <FontAwesomeIcon icon={faPlusCircle} /> Nueva Venta
          </Button>
        </Col>
      </Row>

      <Row>
        <Col>
          <Data setForm={setForm} setModalOpen={setModalOpen} />
        </Col>
      </Row>
    </div>
  );
};

export default Sales;
