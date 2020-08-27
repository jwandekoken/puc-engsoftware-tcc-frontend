import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const FormFilter = ({ formData, onInputChange, onFormSubmit }) => {
  return (
    <Container style={{ marginTop: "35px" }}>
      <Form onSubmit={onFormSubmit}>
        <Row>
          <Col>
            <h3 style={{ textAlign: "center" }}>Clientes Inadimplentes</h3>
          </Col>
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Col>
            <Form.Group>
              <Form.Control
                type="text"
                id="name"
                placeholder="Nome do Cliente"
                onChange={onInputChange}
                value={formData.name.value}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6} sm={12}>
            <input
              type="date"
              id="startingDate"
              className="form-control"
              onChange={onInputChange}
              value={formData.startingDate.value}
            />
          </Col>
          <Col md={6} sm={12}>
            <input
              type="date"
              id="finishingDate"
              className="form-control"
              onChange={onInputChange}
              value={formData.finishingDate.value}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: "15px" }}>
          <Col>
            <Button type="submit" className="form-control" variant="info">
              Buscar
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

FormFilter.propTypes = {
  formData: PropTypes.object.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default FormFilter;
