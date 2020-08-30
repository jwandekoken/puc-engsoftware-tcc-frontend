import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Row, Col, Form, Button, Spinner } from "react-bootstrap";

import styles from "./SearchInstructorForm.module.css";
import {
  turnIsLoadingOn,
  turnIsLoadingOff,
} from "../../../shared/redux/actions/is-loading";
import { setError } from "../../../shared/redux/actions/error";

const SearchInstructorForm = ({
  auth,
  turnIsLoadingOn,
  turnIsLoadingOff,
  setError,
  isLoading,
  setInstructor,
}) => {
  const [formData, setFormData] = useState({
    name: {
      value: "",
      isValid: false,
      touched: false,
      errorMessage: "",
    },
  });

  const onInputChange = (e) => {
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
    } else {
      turnIsLoadingOn();
      fetch(
        `http://localhost:5000/api/usuarios/instrutor/${formData.name.value}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: auth.token,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          turnIsLoadingOff();
          console.log(data);
          setInstructor(data.instructor);
        })
        .catch((err) => {
          turnIsLoadingOff();
          console.log(err);
          setError("Erro ao obter o instrutor.");
        });
    }
  };

  return (
    <Row style={{ marginTop: "20px" }}>
      <Col>
        <Form onSubmit={onFormSubmit}>
          <Form.Control
            type="text"
            placeholder="Nome do Instrutor"
            style={{ marginRight: "5px" }}
            id="name"
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
          <Button
            variant="success"
            type="submit"
            className="form-control"
            style={{ marginTop: "5px" }}
          >
            {isLoading ? (
              <Spinner animation="border" variant="light" />
            ) : (
              "Buscar"
            )}
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

SearchInstructorForm.propTypes = {
  auth: PropTypes.object.isRequired,
  setError: PropTypes.func.isRequired,
  turnIsLoadingOn: PropTypes.func.isRequired,
  turnIsLoadingOff: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  setInstructor: PropTypes.func.isRequired,
};

const mapStateToProps = ({ isLoading }) => ({
  isLoading,
});

export default connect(mapStateToProps, {
  setError,
  turnIsLoadingOn,
  turnIsLoadingOff,
})(SearchInstructorForm);
