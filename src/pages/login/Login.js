import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Card, Form, Button, Spinner } from "react-bootstrap";
import validator from "validator";

import { logInUser } from "../../shared/redux/actions/auth";
import { setError } from "../../shared/redux/actions/error";
import Navigation from "../../shared/components/navigation/Navigation";
import Footer from "../../shared/components/ui-elements/Footer";
import styles from "./Login.module.css";

const Login = ({ logInUser, setError, isLoading }) => {
  const [formData, setFormData] = useState({
    email: {
      value: "",
      isValid: false,
      touched: false,
      errorMessage: "",
    },
    password: {
      value: "",
      isValid: false,
      touched: false,
      errorMessage: "",
    },
  });

  const onInputChange = (e) => {
    // email
    if (e.target.id === "email") {
      if (!validator.isEmail(e.target.value)) {
        setFormData({
          ...formData,
          [e.target.id]: {
            value: e.target.value,
            isValid: false,
            touched: true,
            errorMessage: "Preencha um email válido.",
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

    // password
    if (e.target.id === "password") {
      if (e.target.value.length < 6) {
        setFormData({
          ...formData,
          [e.target.id]: {
            value: e.target.value,
            isValid: false,
            touched: true,
            errorMessage: "Preencha sua senha.",
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
    console.log(formData);

    if (!formData.email.isValid) {
      setFormData({
        ...formData,
        email: {
          value: formData.email.value,
          isValid: false,
          touched: true,
          errorMessage: "Preencha um email válido.",
        },
      });
    } else if (!formData.password.isValid) {
      setFormData({
        ...formData,
        password: {
          value: formData.password.value,
          isValid: false,
          touched: true,
          errorMessage: "Preencha sua senha.",
        },
      });
    } else {
      logInUser(formData.email.value, formData.password.value);
    }
  };

  return (
    <div>
      <Navigation />
      <div className={styles.contentWrapper}>
        <Card>
          <Card.Body>
            <Card.Title style={{ textAlign: "center" }}>Login</Card.Title>
            <div>
              <Form onSubmit={onFormSubmit}>
                <Form.Group>
                  <Form.Label htmlFor="email">Email</Form.Label>
                  <Form.Control
                    id="email"
                    type="email"
                    placeholder="Digite seu Email"
                    value={formData.email.value}
                    onChange={onInputChange}
                    onBlur={onInputChange}
                    className={
                      formData.email.touched && !formData.email.isValid
                        ? styles.invalidFormControl
                        : ""
                    }
                  />
                  {formData.email.touched && !formData.email.isValid && (
                    <div className={styles.formErrorTextWrapper}>
                      <p className={styles.errorText}>
                        {formData.email.errorMessage}
                      </p>
                    </div>
                  )}
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="password">Senha</Form.Label>
                  <Form.Control
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={formData.password.value}
                    onChange={onInputChange}
                    onBlur={onInputChange}
                    className={
                      formData.password.touched && !formData.password.isValid
                        ? styles.invalidFormControl
                        : ""
                    }
                  />
                  {formData.password.touched && !formData.password.isValid && (
                    <div className={styles.formErrorTextWrapper}>
                      <p className={styles.errorText}>
                        {formData.password.errorMessage}
                      </p>
                    </div>
                  )}
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="form-control"
                >
                  {isLoading ? (
                    <Spinner animation="border" variant="light" />
                  ) : (
                    "Entrar"
                  )}
                </Button>
              </Form>
            </div>
          </Card.Body>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

Login.propTypes = {
  logInUser: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ isLoading }) => ({
  isLoading,
});

export default connect(mapStateToProps, {
  logInUser,
  setError,
})(Login);
