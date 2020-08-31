import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button, Modal, Spinner } from "react-bootstrap";

import {
  turnIsLoadingOn,
  turnIsLoadingOff,
} from "../../../shared/redux/actions/is-loading";
import { setError } from "../../../shared/redux/actions/error";

const DeleteInstructorModal = ({
  instructorToEdit,
  showModal,
  setShowModal,
  auth,
  setError,
  isLoading,
  turnIsLoadingOn,
  turnIsLoadingOff,
}) => {
  const [msg, setMsg] = useState();

  const deleteInstructor = () => {
    turnIsLoadingOn();
    fetch(
      `http://localhost:5000/api/usuarios/instrutor/${instructorToEdit._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth.token,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        turnIsLoadingOff();
        setMsg("Instrutor deletado com sucesso.");
        console.log(data);
      })
      .catch((err) => {
        turnIsLoadingOff();
        console.log(err);
        setError("Erro ao criar o instrutor.");
      });
  };

  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Deletar Instrutor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {msg && (
            <div
              style={{
                marginBottom: "10px",
                border: "2px dashed green",
              }}
            >
              <p style={{ margin: "5px 0 5px 0", textAlign: "center" }}>
                {msg}
              </p>
            </div>
          )}
          Tem certeza que deseja deletar o instrutor{" "}
          {instructorToEdit && instructorToEdit.name}?
          <Button
            variant="danger"
            className="form-control"
            style={{ marginTop: "5px" }}
            onClick={deleteInstructor}
          >
            {isLoading ? (
              <Spinner animation="border" variant="light" />
            ) : (
              "Deletar"
            )}
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

DeleteInstructorModal.propTypes = {
  instructorToEdit: PropTypes.object,
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  setError: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  turnIsLoadingOn: PropTypes.func.isRequired,
  turnIsLoadingOff: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth, isLoading }) => ({
  auth,
  isLoading,
});

export default connect(mapStateToProps, {
  turnIsLoadingOn,
  turnIsLoadingOff,
  setError,
})(DeleteInstructorModal);
