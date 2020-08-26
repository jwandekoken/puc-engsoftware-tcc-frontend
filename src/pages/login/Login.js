import React from "react";
import { Card, Form, Button } from "react-bootstrap";

import Navigation from "../../shared/components/navigation/Navigation";
import Footer from "../../shared/components/ui-elements/Footer";
import styles from "./Login.module.css";

const Login = () => {
  return (
    <div>
      <Navigation />
      <div className={styles.contentWrapper}>
        <Card>
          <Card.Body>
            <Card.Title style={{ textAlign: "center" }}>Login</Card.Title>
            <div className={styles.formWrapper}>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Digite seu Email" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="form-control"
                >
                  Entrar
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

export default Login;
