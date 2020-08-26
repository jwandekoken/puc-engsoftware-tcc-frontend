import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaUserAltSlash } from "react-icons/fa";
import { BiMoney } from "react-icons/bi";
import { FaUserNinja } from "react-icons/fa";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

import Navigation from "../../shared/components/navigation/Navigation";
import Footer from "../../shared/components/ui-elements/Footer";
import styles from "./Dashboard.module.css";

const Dashboard = ({ auth }) => {
  return (
    <div>
      {!auth.isLoggedIn && <Redirect to="/login" />}
      <Navigation />
      <div className={styles.contentWrapper}>
        <Container>
          <Row style={{ margin: "40px 0 40px 0" }}>
            <Col sm={12} md={4} className={styles.dashboardCardCol}>
              <Card style={{ width: "18rem" }}>
                <Card.Body className={styles.cardBody}>
                  <FaUserAltSlash style={{ fontSize: "25px" }} />
                  <Card.Title>Inadimplentes</Card.Title>

                  <Button variant="danger" size="lg">
                    <FaRegArrowAltCircleRight />
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={12} md={4} className={styles.dashboardCardCol}>
              <Card style={{ width: "18rem" }}>
                <Card.Body className={styles.cardBody}>
                  <BiMoney style={{ fontSize: "25px" }} />
                  <Card.Title>Novo Pgto</Card.Title>

                  <Button variant="success" size="lg">
                    <FaRegArrowAltCircleRight />
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={12} md={4} className={styles.dashboardCardCol}>
              <Card style={{ width: "18rem" }}>
                <Card.Body className={styles.cardBody}>
                  <FaUserNinja style={{ fontSize: "25px" }} />
                  <Card.Title>Instrutores</Card.Title>

                  <Button variant="info" size="lg">
                    <FaRegArrowAltCircleRight />
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = ({ auth }) => ({
  auth,
});

export default connect(mapStateToProps)(Dashboard);
