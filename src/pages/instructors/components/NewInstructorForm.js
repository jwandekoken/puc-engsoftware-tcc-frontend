import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Row, Col, Form, Button, Modal } from "react-bootstrap";

import { setError } from "../../../shared/redux/actions/error";
import {
  turnIsLoadingOn,
  turnIsLoadingOff,
} from "../../../shared/redux/actions/is-loading";
import styles from "./NewInstructorForm.module.css";

const EditOrCreateNewInstructorForm = ({
  auth,
  turnIsLoadingOn,
  turnIsLoadingOff,
  setError,
}) => {
  const [formData, setFormData] = useState({
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

  const [showModal, setShowModal] = useState(false);

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
      fetch(`http://localhost:5000/api/usuarios/instrutor/novo`, {
        method: "POST",
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
      })
        .then((res) => res.json())
        .then((data) => {
          turnIsLoadingOff();

          if (data.instructor) {
            setShowModal(true);
          }

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
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Instrutor Criado com Sucesso!</Modal.Title>
        </Modal.Header>
        <Modal.Body>O Instrutor foi Criado com Sucesso!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Row style={{ marginTop: "50px" }}>
        <Col>
          <h4 style={{ textAlign: "center" }}>Novo Instrutor</h4>

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
            {formData.typeOfActivity.touched &&
              !formData.typeOfActivity.isValid && (
                <div className={styles.formErrorTextWrapper}>
                  <p className={styles.errorText}>
                    {formData.typeOfActivity.errorMessage}
                  </p>
                </div>
              )}

            <div style={{ textAlign: "center" }}>
              <Button variant="primary" type="submit">
                Cadastrar
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </>
  );
};

EditOrCreateNewInstructorForm.propTypes = {
  auth: PropTypes.object.isRequired,
  turnIsLoadingOn: PropTypes.func.isRequired,
  turnIsLoadingOff: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
};

export default connect(null, {
  turnIsLoadingOn,
  turnIsLoadingOff,
  setError,
})(EditOrCreateNewInstructorForm);
