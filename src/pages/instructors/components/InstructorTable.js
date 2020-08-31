import React, { useState } from "react";
import PropTypes from "prop-types";
import { Row, Col, Button, Table } from "react-bootstrap";

import EditInstructorModal from "./EditInstructorModal";
import DeleteInstructorModal from "./DeleteInstructorModal";

const InstructorTable = ({
  instructor,
  instructorToEdit,
  setInstructorToEdit,
}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <>
      <EditInstructorModal
        showModal={showEditModal}
        setShowModal={setShowEditModal}
        instructorToEdit={instructorToEdit}
      />

      <DeleteInstructorModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
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
                      setShowEditModal(true);
                    }}
                  >
                    Editar
                  </Button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => {
                      setInstructorToEdit(instructor);
                      setShowDeleteModal(true);
                    }}
                  >
                    Deletar
                  </Button>
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
