import React from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";

import New from "../components/Sales/New";
import Data from "../components/Sales/Data";
import { setModalOpen } from "../actions/index";

const Sales = ({setModalOpen}) => (
  <div>
    <New />
    <Button color="primary" onClick={() => setModalOpen(true)}>Nueva Venta</Button>
    <Data />
  </div>
);

const mapDispatchToProps = {
  setModalOpen,
};

export default connect(null, mapDispatchToProps)(Sales);
