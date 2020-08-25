import React from "react";
import { Button } from "react-bootstrap";

import styles from "./HeroBanner.module.css";

const HeroBanner = () => {
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.contentWrapper}>
        <h1>Birl Sistemas</h1>
        <p className="lead">Sistema Gerencial Para Academias</p>
        <Button variant="light" size="lg">
          Iniciar
        </Button>
      </div>
    </div>
  );
};

export default HeroBanner;
