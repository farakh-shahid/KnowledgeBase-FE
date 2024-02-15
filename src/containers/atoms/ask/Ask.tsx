import React from 'react';
import styles from '@/styles/Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
const Ask = () => {
  return (
    <div className={styles.ask_container}>
      <FontAwesomeIcon icon={faPenToSquare} className={styles.pen__icon} />
      <p className={styles.ask}>Ask</p>
    </div>
  );
};

export default Ask;
