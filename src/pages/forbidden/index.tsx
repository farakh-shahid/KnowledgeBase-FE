import React from "react";
import styles from "@/styles/forbidden.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

const Index = () => {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <FontAwesomeIcon icon={faTriangleExclamation} />
        <p className={styles.text}>You do not have access for this website!</p>
      </div>
    </div>
  );
};

export default Index;
