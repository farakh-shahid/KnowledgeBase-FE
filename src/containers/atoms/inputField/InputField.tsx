import React from 'react';
import styles from '../../../styles/inputField.module.scss';
import { colors } from '@/assets/colors';
import { InputFieldProps } from '@/interfaces/inputFieldProps';

const InputField = (props: InputFieldProps) => {
  return (
    <>
      <input
        className={props.search ? styles.input__search : styles.field}
        color={colors.common.grey}
        autoComplete="email"
        {...props}
      />
    </>
  );
};

export default InputField;
