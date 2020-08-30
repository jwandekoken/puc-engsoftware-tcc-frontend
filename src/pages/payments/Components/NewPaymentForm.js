import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Row, Col, Form, Button, Spinner, Modal } from "react-bootstrap";
import validator from "validator";

import {
  turnIsLoadingOn,
  turnIsLoadingOff,
} from "../../../shared/redux/actions/is-loading";
import { setError } from "../../../shared/redux/actions/error";

const NewPaymentForm = ({
  userData,
  auth,
  setError,
  isLoading,
  turnIsLoadingOn,
  turnIsLoadingOff,
}) => {
  const [formData, setFormData] = useState({
    paymentDate: {
      value: "",
      isValid: false,
      touched: false,
      errorMessage: "",
    },
  });

  const [showModal, setShowModal] = useState(false);

  const onInputChange = (e) => {
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
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.paymentDate.isValid) {
      setFormData({
        ...formData,
        paymentDate: {
          value: formData.paymentDate.value,
          isValid: false,
          touched: true,
          errorMessage: "Preencha uma data válida.",
        },
      });
    } else {
      turnIsLoadingOn();
      fetch(`http://localhost:5000/api/pagamentos/novo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth.token,
        },
        body: JSON.stringify({
          signaturePlanId: userData._id,
          paymentDate: formData.paymentDate.value,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          turnIsLoadingOff();
          console.log(data);

          if (data.savedPayment) {
            setShowModal(true);
          }
        })
        .catch((err) => {
          turnIsLoadingOff();
          console.log(err);
          setError("Erro ao obter o Cliente.");
        });
    }
  };

  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Pagamento Cadastrado</Modal.Title>
        </Modal.Header>
        <Modal.Body>O Pagamento com cadastrado com sucesso!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Row style={{ marginTop: "50px" }}>
        <Col>
          <h4 style={{ textAlign: "center" }}>Novo Pagamento</h4>

          <p style={{ textAlign: "center" }}>
            Será lançado um novo pagamento para o cliente buscado acima, no
            valor de seu plano, na data preenchida abaixo.
          </p>

          <Form onSubmit={onFormSubmit}>
            <Form.Control
              type="date"
              placeholder="Data do Pgto"
              style={{ marginBottom: "15px" }}
              id="paymentDate"
              value={formData.paymentDate.value}
              onChange={onInputChange}
              onBlur={onInputChange}
            />
            <div style={{ textAlign: "center" }}>
              <Button variant="primary" type="submit" className="form-control">
                {isLoading ? (
                  <Spinner animation="border" variant="light" />
                ) : (
                  "Lançar Pgto"
                )}
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </>
  );
};

NewPaymentForm.propTypes = {
  auth: PropTypes.object.isRequired,
  setError: PropTypes.func.isRequired,
  userData: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  turnIsLoadingOn: PropTypes.func.isRequired,
  turnIsLoadingOff: PropTypes.func.isRequired,
};

const mapStateToProps = ({ isLoading }) => ({
  isLoading,
});

export default connect(mapStateToProps, {
  turnIsLoadingOn,
  turnIsLoadingOff,
  setError,
})(NewPaymentForm);
