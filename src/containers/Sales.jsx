import React from "react";
import { connect } from "react-redux";
import { Button, Col, Row } from "reactstrap";

import New from "../components/Sales/New";
import Data from "../components/Sales/Data";
import { setModalOpen } from "../actions/index";

const Sales = ({ setModalOpen }) => (
  <div>
    <New />

    <Row className="mb-4">
      <Col xs="12" md={{ size: 4, offset: 8 }} lg={{ size: 2, offset: 10 }}>
        <Button color="primary" onClick={() => setModalOpen(true)} block>
          Nueva Venta
        </Button>
      </Col>
    </Row>

    <Row>
      <Col>
        <Data />
      </Col>
    </Row>
  </div>
);

const mapDispatchToProps = {
  setModalOpen,
};

export default connect(null, mapDispatchToProps)(Sales);
