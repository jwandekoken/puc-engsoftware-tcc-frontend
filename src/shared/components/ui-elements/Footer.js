import React from "react";
import { FaHeart } from "react-icons/fa";

import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.contentWrapper}>
        <p style={{ margin: "0" }}>
          Feito com <FaHeart style={{ color: "red", margin: "0 3px 0 3px" }} />{" "}
          por Julio Wandekoken
        </p>
      </div>
    </div>
  );
};

export default Footer;
