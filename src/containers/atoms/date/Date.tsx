import React from 'react';
import styles from '@/styles/Date.module.scss';
import { DateProps } from '@/interfaces/dateProps';

const DateTime = (props: DateProps) => {
  return <p className={styles.time}>{props.label}</p>;
};

export default DateTime;
