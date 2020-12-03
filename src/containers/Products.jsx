import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Button, Col, Row } from "reactstrap";

import New from "../components/Products/New";
import Data from "../components/Products/Data";

const defaultForm = {
  image: "",
  name: "",
  price: 0.0,
  slug: "",
  comision: 3,
};

const Products = () => {
  const [form, setForm] = useState(defaultForm);
  const [modalOpen, setModalOpen] = useState(false);

  const newProduct = () => {
    setModalOpen(true);
    setForm(defaultForm);
  };

  return (
    <div>
      <New form={form} setForm={setForm} defaultForm={defaultForm} modalOpen={modalOpen} setModalOpen={setModalOpen} />

      <Row className="mb-4">
        <Col xs="12" md={{ size: 4, offset: 8 }} lg={{ size: 2, offset: 10 }}>
          <Button color="success" onClick={newProduct} block>
            <FontAwesomeIcon icon={faPlusCircle} /> Nuevo producto
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

export default Products;
