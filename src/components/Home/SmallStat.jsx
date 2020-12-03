import React from "react";
import { Card, CardText, CardTitle } from "reactstrap";

const SmallStat = ({ title, value, color }) => (
  <Card body inverse className="text-center" color={color}>
    <CardTitle tag="h5">{title}</CardTitle>
    <CardText>{value}</CardText>
  </Card>
);

export default SmallStat;
