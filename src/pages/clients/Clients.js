import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Container, Table, Row, Col, Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import validator from "validator";

import Navigation from "../../shared/components/navigation/Navigation";
import Footer from "../../shared/components/ui-elements/Footer";
import FormFilter from "./Components/FormFilter";
import styles from "./Clients.module.css";

const Clients = ({ auth }) => {
  const [formData, setFormData] = useState({
    name: {
      value: "",
      isValid: false,
      touched: false,
      errorMessage: "",
    },
    startingDate: {
      value: "",
      isValid: false,
      touched: false,
      errorMessage: "",
    },
    finishingDate: {
      value: "",
      isValid: false,
      touched: false,
      errorMessage: "",
    },
  });

  const onInputChange = (e) => {
    if (e.target.id === "name") {
      if (e.target.value.length > 0) {
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

    if (e.target.id === "startingDate" || e.target.id === "finishingDate") {
      if (!validator.isDate(e.target.value)) {
        setFormData({
          ...formData,
          [e.target.id]: {
            value: e.target.value,
            isValid: false,
            touched: true,
            errorMessage: "Preencha uma data válida.",
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

    let clientNameFilter = null;
    let startingDateFilter = null;
    let finishingDateFilter = null;

    if (formData.name.value !== "" && formData.name.isValid) {
      clientNameFilter = formData.name.value;
    }

    if (formData.startingDate.value !== "" && formData.startingDate.isValid) {
      startingDateFilter = formData.startingDate.value;
    }

    if (formData.finishingDate.value !== "" && formData.finishingDate.isValid) {
      finishingDateFilter = formData.finishingDate.value;
    }

    // MAKE REQUEST TO BACKEND
  };

  return (
    <>
      {!auth.isLoggedIn && <Redirect to="/login" />}
      <Navigation />
      <div className={styles.contentWrapper}>
        <FormFilter
          formData={formData}
          onInputChange={onInputChange}
          onFormSubmit={onFormSubmit}
        />
        <Container style={{ border: "2px dashed #b43fe3", marginTop: "60px" }}>
          <Table
            striped
            bordered
            hover
            responsive
            style={{ marginTop: "15px" }}
          >
            <thead>
              <tr>
                <th>Matrícula</th>
                <th>Nome</th>
                <th>CPF</th>
                <th>Vencido desde</th>
                <th>Valor devido</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>11111</td>
                <td>xx/xx/xxxx</td>
                <td>R$ xx,xx</td>
              </tr>
            </tbody>
          </Table>
        </Container>
      </div>
      <Footer />
    </>
  );
};

Clients.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = ({ auth }) => ({
  auth,
});

export default connect(mapStateToProps)(Clients);
