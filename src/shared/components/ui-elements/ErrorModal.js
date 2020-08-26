import React from "react";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";

import { removeError } from "../../redux/actions/error";

const ErrorModal = ({ error, removeError }) => {
  return (
    <Modal show={error.showError} onHide={removeError}>
      <Modal.Header closeButton>
        <Modal.Title>{error.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{error.msg}</p>
      </Modal.Body>
    </Modal>
  );
};

ErrorModal.propTypes = {
  error: PropTypes.object.isRequired,
  removeError: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  error: state.error,
});

export default connect(mapStateToProps, {
  removeError,
})(ErrorModal);
