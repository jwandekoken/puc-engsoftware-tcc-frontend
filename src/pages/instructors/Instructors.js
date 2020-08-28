import React from "react";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

import Navigation from "../../shared/components/navigation/Navigation";

const Instructors = () => {
  return (
    <>
      <Navigation />
      <Container>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <Form inline>
              <Form.Control
                type="text"
                placeholder="Nome do Instrutor"
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
                  <th>Nome</th>
                  <th>CPF</th>
                  <th>RG</th>
                  <th>Tipo Atividade</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>xxxxx</td>
                  <td>11111</td>
                  <td>22222</td>
                  <td>Musculacao</td>
                  <td>
                    <Button variant="secondary">Editar</Button>
                  </td>
                  <td>
                    <Button variant="danger">Deletar</Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row style={{ marginTop: "50px" }}>
          <Col>
            <h4 style={{ textAlign: "center" }}>Novo/Editar</h4>

            <Form>
              <Form.Control
                type="text"
                placeholder="Nome"
                style={{ marginBottom: "10px" }}
              />
              <Form.Control
                type="text"
                placeholder="CPF"
                style={{ marginBottom: "10px" }}
              />
              <Form.Control
                type="text"
                placeholder="RG"
                style={{ marginBottom: "10px" }}
              />
              <Form.Control
                type="text"
                placeholder="Tipo Atividade"
                style={{ marginBottom: "15px" }}
              />
              <div style={{ textAlign: "center" }}>
                <Button variant="primary" type="submit">
                  Cadastrar
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Instructors;
