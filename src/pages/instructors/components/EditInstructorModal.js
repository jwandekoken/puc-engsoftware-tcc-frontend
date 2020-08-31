import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button, Modal, Form, Spinner } from "react-bootstrap";

import {
  turnIsLoadingOn,
  turnIsLoadingOff,
} from "../../../shared/redux/actions/is-loading";
import { setError } from "../../../shared/redux/actions/error";
import styles from "./EditInstructorModal.module.css";

const EditInstructorModal = ({
  showModal,
  setShowModal,
  auth,
  turnIsLoadingOn,
  turnIsLoadingOff,
  setError,
  instructorToEdit,
  isLoading,
}) => {
  const [formData, setFormData] = useState({
    name: {
      value: instructorToEdit ? instructorToEdit.name : "",
      isValid: false,
      touched: false,
      errorMessage: "",
    },
    cpf: {
      value: "",
      isValid: false,
      touched: false,
      errorMessage: "",
    },
    rg: {
      value: "",
      isValid: false,
      touched: false,
      errorMessage: "",
    },
    typeOfActivity: {
      value: "",
      isValid: false,
      touched: false,
      errorMessage: "",
    },
  });

  const [msg, setMsg] = useState();

  useEffect(() => {
    setFormData({
      name: {
        value: instructorToEdit ? instructorToEdit.name : "",
        isValid: true,
        touched: true,
        errorMessage: "",
      },
      cpf: {
        value: instructorToEdit ? instructorToEdit.cpf : "",
        isValid: true,
        touched: true,
        errorMessage: "",
      },
      rg: {
        value: instructorToEdit ? instructorToEdit.rg : "",
        isValid: true,
        touched: true,
        errorMessage: "",
      },
      typeOfActivity: {
        value: instructorToEdit ? instructorToEdit.typeOfActivity : "",
        isValid: true,
        touched: true,
        errorMessage: "",
      },
    });
  }, [instructorToEdit]);

  const onInputChange = (e) => {
    if (e.target.id === "name") {
      if (e.target.value.length === 0) {
        setFormData({
          ...formData,
          [e.target.id]: {
            value: e.target.value,
            isValid: false,
            touched: true,
            errorMessage: "Preencha o nome do instrutor.",
          },
        });
      } else {
        setFormData({
          ...formData,
          [e.target.id]: {
            value: e.target.value,
            isValid: true,
            touched: true,
            errorMessage: "",
          },
        });
      }
    }

    if (e.target.id === "cpf") {
      if (e.target.value.length === 0) {
        setFormData({
          ...formData,
          [e.target.id]: {
            value: e.target.value,
            isValid: false,
            touched: true,
            errorMessage: "Preencha o CPF do instrutor.",
          },
        });
      } else {
        setFormData({
          ...formData,
          [e.target.id]: {
            value: e.target.value,
            isValid: true,
            touched: true,
            errorMessage: "",
          },
        });
      }
    }

    if (e.target.id === "rg") {
      if (e.target.value.length === 0) {
        setFormData({
          ...formData,
          [e.target.id]: {
            value: e.target.value,
            isValid: false,
            touched: true,
            errorMessage: "Preencha o RG do instrutor.",
          },
        });
      } else {
        setFormData({
          ...formData,
          [e.target.id]: {
            value: e.target.value,
            isValid: true,
            touched: true,
            errorMessage: "",
          },
        });
      }
    }

    if (e.target.id === "typeOfActivity") {
      if (e.target.value.length === 0) {
        setFormData({
          ...formData,
          [e.target.id]: {
            value: e.target.value,
            isValid: false,
            touched: true,
            errorMessage: "Preencha o tipo de atividade.",
          },
        });
      } else {
        setFormData({
          ...formData,
          [e.target.id]: {
            value: e.target.value,
            isValid: true,
            touched: true,
            errorMessage: "",
          },
        });
      }
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.isValid) {
      setFormData({
        ...formData,
        name: {
          value: formData.name.value,
          isValid: false,
          touched: true,
          errorMessage: "Preencha o nome do instrutor.",
        },
      });
    } else if (!formData.cpf.isValid) {
      setFormData({
        ...formData,
        cpf: {
          value: formData.cpf.value,
          isValid: false,
          touched: true,
          errorMessage: "Preencha o CPF do instrutor.",
        },
      });
    } else if (!formData.rg.isValid) {
      setFormData({
        ...formData,
        rg: {
          value: formData.rg.value,
          isValid: false,
          touched: true,
          errorMessage: "Preencha o RG do instrutor.",
        },
      });
    } else if (!formData.typeOfActivity.isValid) {
      setFormData({
        ...formData,
        rg: {
          value: formData.typeOfActivity.value,
          isValid: false,
          touched: true,
          errorMessage: "Preencha tipo de atividade.",
        },
      });
    } else {
      turnIsLoadingOn();
      fetch(
        `http://localhost:5000/api/usuarios/instrutor/${instructorToEdit._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: auth.token,
          },
          body: JSON.stringify({
            name: formData.name.value,
            cpf: formData.cpf.value,
            rg: formData.rg.value,
            userType: "instrutor",
            typeOfActivity: formData.typeOfActivity.value,
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          turnIsLoadingOff();

          // updatedInstructor
          console.log(data);
          setMsg("Instrutor editado com sucesso!");

          setFormData({
            name: {
              value: "",
              isValid: false,
              touched: false,
              errorMessage: "",
            },
            cpf: {
              value: "",
              isValid: false,
              touched: false,
              errorMessage: "",
            },
            rg: {
              value: "",
              isValid: false,
              touched: false,
              errorMessage: "",
            },
            typeOfActivity: {
              value: "",
              isValid: false,
              touched: false,
              errorMessage: "",
            },
          });
        })
        .catch((err) => {
          turnIsLoadingOff();
          console.log(err);
          setError("Erro ao criar o instrutor.");
        });
    }
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Instrutor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {msg && <p style={{ color: "green" }}>{msg}</p>}

        <Form onSubmit={onFormSubmit}>
          <Form.Control
            type="text"
            placeholder="Nome"
            style={{ marginBottom: "10px" }}
            id="name"
            value={formData.name.value}
            onChange={onInputChange}
            onBlur={onInputChange}
            className={
              formData.name.touched && !formData.name.isValid
                ? styles.invalidFormControl
                : ""
            }
          />
          {formData.name.touched && !formData.name.isValid && (
            <div className={styles.formErrorTextWrapper}>
              <p className={styles.errorText}>{formData.name.errorMessage}</p>
            </div>
          )}

          <Form.Control
            type="text"
            placeholder="CPF"
            style={{ marginBottom: "10px" }}
            id="cpf"
            value={formData.cpf.value}
            onChange={onInputChange}
            onBlur={onInputChange}
            className={
              formData.cpf.touched && !formData.cpf.isValid
                ? styles.invalidFormControl
                : ""
            }
          />
          {formData.cpf.touched && !formData.cpf.isValid && (
            <div className={styles.formErrorTextWrapper}>
              <p className={styles.errorText}>{formData.cpf.errorMessage}</p>
            </div>
          )}

          <Form.Control
            type="text"
            placeholder="RG"
            style={{ marginBottom: "10px" }}
            id="rg"
            value={formData.rg.value}
            onChange={onInputChange}
            onBlur={onInputChange}
            className={
              formData.rg.touched && !formData.rg.isValid
                ? styles.invalidFormControl
                : ""
            }
          />
          {formData.rg.touched && !formData.rg.isValid && (
            <div className={styles.formErrorTextWrapper}>
              <p className={styles.errorText}>{formData.rg.errorMessage}</p>
            </div>
          )}

          <Form.Control
            type="text"
            placeholder="Tipo Atividade"
            style={{ marginBottom: "15px" }}
            id="typeOfActivity"
            value={formData.typeOfActivity.value}
            onChange={onInputChange}
            onBlur={onInputChange}
            className={
              formData.typeOfActivity.touched &&
              !formData.typeOfActivity.isValid
                ? styles.invalidFormControl
                : ""
            }
          />
          {formData.typeOfActivity.touched && !formData.typeOfActivity.isValid && (
            <div className={styles.formErrorTextWrapper}>
              <p className={styles.errorText}>
                {formData.typeOfActivity.errorMessage}
              </p>
            </div>
          )}

          <div style={{ textAlign: "center" }}>
            <Button variant="primary" type="submit">
              {isLoading ? (
                <Spinner animation="border" variant="light" />
              ) : (
                "Editar"
              )}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

EditInstructorModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  turnIsLoadingOn: PropTypes.func.isRequired,
  turnIsLoadingOff: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  instructorToEdit: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ auth, isLoading }) => ({
  isLoading,
  auth,
});

export default connect(mapStateToProps, {
  turnIsLoadingOn,
  turnIsLoadingOff,
  setError,
})(EditInstructorModal);
