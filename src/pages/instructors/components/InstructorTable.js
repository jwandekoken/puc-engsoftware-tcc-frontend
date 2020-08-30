import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Button, Table } from "react-bootstrap";

const InstructorTable = ({ instructor, setInstructorToEdit }) => {
  return (
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
              <td>{instructor.name}</td>
              <td>{instructor.cpf}</td>
              <td>{instructor.rg}</td>
              <td>{instructor.typeOfActivity}</td>
              <td>
                <Button
                  variant="secondary"
                  onClick={() => setInstructorToEdit(instructor)}
                >
                  Editar
                </Button>
              </td>
              <td>
                <Button variant="danger">Deletar</Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

InstructorTable.propTypes = {
  instructor: PropTypes.object.isRequired,
  setInstructorToEdit: PropTypes.func.isRequired,
};

export default InstructorTable;
