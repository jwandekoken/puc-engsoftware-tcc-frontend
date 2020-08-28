import React from "react";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

import Navigation from "../../shared/components/navigation/Navigation";

const Payment = () => {
  return (
    <>
      <Navigation />
      <Container>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <Form inline>
              <Form.Control
                type="text"
                placeholder="Nome do Cliente"
                style={{ marginRight: "5px" }}
              />
              <Button variant="success" type="submit">
                <FaSearch />
              </Button>
            </Form>
          </Col>
        </Row>
        <Row style={{ marginTop: "50px" }}>
          <Col>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Matrícula</th>
                  <th>Nome</th>
                  <th>Data Venc</th>
                  <th>Plano</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>11111</td>
                  <td>Mark</td>
                  <td>xx/xx/xxxx</td>
                  <td>Mensal</td>
                  <td>R$ 100,00</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row style={{ marginTop: "50px" }}>
          <Col>
            <h4 style={{ textAlign: "center" }}>Novo Pagamento</h4>

            <Form>
              <Form.Control
                type="text"
                placeholder="Nome do Cliente"
                style={{ marginBottom: "15px" }}
              />
              <div style={{ textAlign: "center" }}>
                <Button variant="primary" type="submit">
                  Lançar Pgto
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Payment;
