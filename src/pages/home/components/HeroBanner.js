import React from "react";
import { Button, Container } from "react-bootstrap";

import styles from "./HeroBanner.module.css";

const HeroBanner = () => {
  return (
    <div className={styles.mainWrapper}>
      <Container className={styles.contentWrapper}>
        <h1>BIRL!</h1>
        <p className="lead">Gym Management</p>
        <Button variant="light" size="lg">
          Iniciar
        </Button>
      </Container>
    </div>
  );
};

export default HeroBanner;
