import React from "react";
import { Card } from "react-bootstrap";
import "./customCard.style.css";
export const CustomCard = ({ count, title }) => {
  return (
    <Card style={{ minwidth: "18rem" }} className="customCard">
      <Card.Body className=" customCard_body py-3 text-light">
        <Card.Title className="customCard_title">{count}</Card.Title>
        <Card.Text className="customCard_text">{title}</Card.Text>
      </Card.Body>
    </Card>
  );
};
