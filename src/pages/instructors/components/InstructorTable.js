import React, { useState } from "react";
import PropTypes from "prop-types";
import { Row, Col, Button, Table } from "react-bootstrap";

import EditInstructorModal from "./EditInstructorModal";

const InstructorTable = ({
  instructor,
  instructorToEdit,
  setInstructorToEdit,
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <EditInstructorModal
        showModal={showModal}
        setShowModal={setShowModal}
        instructorToEdit={instructorToEdit}
      />

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
                    onClick={() => {
                      setInstructorToEdit(instructor);
                      setShowModal(true);
                    }}
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
    </>
  );
};

InstructorTable.propTypes = {
  instructor: PropTypes.object.isRequired,
  instructorToEdit: PropTypes.object,
  setInstructorToEdit: PropTypes.func.isRequired,
};

export default InstructorTable;
