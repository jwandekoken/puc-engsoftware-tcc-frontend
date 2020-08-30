import React, { useState } from "react";
import { connect } from "react-redux";
import { Row, Col, Form, Button, Spinner } from "react-bootstrap";
import PropTypes from "prop-types";

import {
  turnIsLoadingOn,
  turnIsLoadingOff,
} from "../../../shared/redux/actions/is-loading";
import { setError } from "../../../shared/redux/actions/error";
import styles from "./SearchUserForm.module.css";

const SearchUserForm = ({
  turnIsLoadingOn,
  turnIsLoadingOff,
  auth,
  isLoading,
  setUserData,
  setError,
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
          errorMessage: "Preencha o nome do Cliente.",
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
          errorMessage: "Preencha o nome do Cliente.",
        },
      });
    } else {
      turnIsLoadingOn();
      fetch(`http://localhost:5000/api/usuarios/${formData.name.value}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: auth.token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          turnIsLoadingOff();
          console.log(data);

          const currentDate = new Date();
          const dueDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            new Date(data.userData.dateOfStart).getDate()
          );

          const userDataObj = {
            ...data.userData,
            dueDate: dueDate.toISOString(),
          };

          setUserData(userDataObj);
        })
        .catch((err) => {
          turnIsLoadingOff();
          console.log(err);
          setError("Erro ao obter o Cliente.");
        });
    }
  };

  return (
    <Row style={{ marginTop: "20px" }}>
      <Col>
        <h4 style={{ textAlign: "center" }}>Digite o nome do Cliente</h4>
        <Form onSubmit={onFormSubmit}>
          <Form.Control
            type="text"
            placeholder="Nome do Cliente"
            style={{ marginRight: "5px" }}
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

SearchUserForm.propTypes = {
  setUserData: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  turnIsLoadingOn: PropTypes.func.isRequired,
  turnIsLoadingOff: PropTypes.func.isRequired,
};

const mapStateToProps = ({ isLoading }) => ({
  isLoading,
});

export default connect(mapStateToProps, {
  setError,
  turnIsLoadingOn,
  turnIsLoadingOff,
})(SearchUserForm);
