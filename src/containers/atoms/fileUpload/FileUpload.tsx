import React from 'react';
import styles from '../../../styles/inputField.module.scss';
import { colors } from '@/assets/colors';
import { InputFieldProps } from '@/interfaces/inputFieldProps';

const FileUpload = (props: InputFieldProps) => {
  return (
    <input
      className={styles.field}
      color={colors.common.grey}
      autoComplete="email"
      {...props}
    />
  );
};

export default FileUpload;
