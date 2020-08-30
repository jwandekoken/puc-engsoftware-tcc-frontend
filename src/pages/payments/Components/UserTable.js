import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Table } from "react-bootstrap";

const UserTable = ({ userData }) => {
  return (
    <Row style={{ marginTop: "50px" }}>
      <Col>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Matrícula</th>
              <th>Nome</th>
              <th>Data Venc</th>
              <th>Plano</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{userData.client_id._id}</td>
              <td>{userData.client_id.name}</td>
              <td>{`${new Date(userData.dueDate).getDate()}/${
                new Date(userData.dueDate).getMonth() + 1
              }/${new Date(userData.dueDate).getFullYear()}`}</td>
              <td>{userData.planType}</td>
              <td>{`R$ ${userData.price.$numberDecimal},00`}</td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

UserTable.propTypes = {
  userData: PropTypes.object,
};

export default UserTable;
