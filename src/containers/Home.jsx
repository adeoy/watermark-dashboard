import React, { useState } from "react";
import { connect } from "react-redux";

import { Row, Col } from "reactstrap";

import MainChart from "../components/Home/MainChart";
import SmallStatList from "../components/Home/SmallStatList";

const Home = ({ sales, expenses }) => {
  const [form, setForm] = useState({
    yearMonth: "2020-11",
    monthLastDay: 30,
  });

  return (
    <>
      <Row className="mb-4">
        <Col xs="12">
          <h5>Estadísticas Generales</h5>
        </Col>
        <SmallStatList sales={sales} expenses={expenses} />
      </Row>

      <Row>
        <Col xs="12">
          <h5>Estadísticas por Mes</h5>
        </Col>
        <Col xm="12" md={{ size: 10, offset: 1 }} lg={{ size: 8, offset: 2 }}>
          <MainChart form={form} sales={sales} />
        </Col>
      </Row>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    sales: state.sales,
    expenses: state.expenses,
  };
};

export default connect(mapStateToProps, null)(Home);
