import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Container, Table } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import validator from "validator";

import { setError } from "../../shared/redux/actions/error";
import Navigation from "../../shared/components/navigation/Navigation";
import Footer from "../../shared/components/ui-elements/Footer";
import FormFilter from "./Components/FormFilter";
import styles from "./Clients.module.css";

const Clients = ({ auth, setError }) => {
  const [unpayingCustomers, setUnpayingCustomers] = useState([]);

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
    console.log("formData", formData);

    let clientNameFilter;
    let startingDateFilter;
    let finishingDateFilter;

    if (formData.name.value !== "" && formData.name.isValid) {
      clientNameFilter = formData.name.value;
    }

    if (formData.startingDate.value !== "" && formData.startingDate.isValid) {
      startingDateFilter = formData.startingDate.value;
    }

    if (formData.finishingDate.value !== "" && formData.finishingDate.isValid) {
      finishingDateFilter = formData.finishingDate.value;
    }

    // make request to backend

    fetch("http://localhost:5000/api/pagamentos/unpaying", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth.token,
      },
      body: JSON.stringify({
        name: clientNameFilter,
        startingDate: startingDateFilter,
        finishingDate: finishingDateFilter,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.signaturePlans);
        if (data.signaturePlans.length > 0) {
          setUnpayingCustomers(data.signaturePlans);
        } else {
          setUnpayingCustomers([]);
        }
      })
      .catch((err) => {
        console.log(err);
        setError("Erro ao obter os dados.");
      });
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
              {unpayingCustomers.length > 0 &&
                unpayingCustomers.map((unpaying) => (
                  <tr key={unpaying._id}>
                    <td>{unpaying.client_id.rg}</td>
                    <td>{unpaying.client_id.name}</td>
                    <td>{unpaying.client_id.cpf}</td>
                    <td>{`${new Date(unpaying.unpaidSince).getDate()}/${
                      new Date(unpaying.unpaidSince).getMonth() + 1
                    }/${new Date(unpaying.unpaidSince).getFullYear()}`}</td>
                    <td>
                      R${" "}
                      {unpaying.unpayments *
                        parseFloat(unpaying.price.$numberDecimal)}
                    </td>
                  </tr>
                ))}
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
  setError: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth }) => ({
  auth,
});

export default connect(mapStateToProps, {
  setError,
})(Clients);
