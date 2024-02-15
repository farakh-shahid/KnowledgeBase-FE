import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from '@/styles/Tag.module.scss';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const Tag = ({ title, icon }: { title: string; icon: IconProp }) => {
  return (
    <div className={styles.tag__item}>
      <FontAwesomeIcon icon={icon} className={styles.icon} />
      <p>{title}</p>
    </div>
  );
};

export default Tag;
