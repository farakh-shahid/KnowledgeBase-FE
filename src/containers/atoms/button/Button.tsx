import React from 'react';
import styled from 'styled-components';
import { colors } from '@/assets/colors';
import styles from '@/styles/button.module.scss';
import Image from 'next/image';
import google_logo from '@/assets/icons/icons8-google-48.png';
import { ButtonProps } from '@/interfaces/buttonProps';
const FormButton = styled.button.attrs((props: ButtonProps) => props)`
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : ''};
  color: ${(props) => props.textColor};
  border-radius: 8px;
  ${(props) =>
    props.border ? `border: 1px solid ${colors.common.border}` : 'border:none'};
  width: ${(props) => (props.width ? props.width : '100%')};
  height: ${(props) => (props.height ? props.height : '')};
  padding: 8px;
  display:flex;
  align-items:center;
  justify-content:center;
  backgroundColor=${(props) => props.backgroundColor}
  font-size: ${(props) => (props.fontSize ? props.fontSize : '2rem')};
  cursor: pointer;
  color:  ${(props) => (props.color ? props.color : '')};
  font-size:  ${(props) => (props.fontSize ? props.fontSize : '')};
  &:hover {
    background-color: ${(props) =>
      props.hoverBackground ? props.hoverBackground : ''} ;
    color: ${(props) => props.textColor};
  }
`;
const Button = (props: ButtonProps) => {
  return (
    <FormButton {...props}>
      {props.icon && (
        <span className={styles.button__icon}>
          <Image src={google_logo} alt="G" width={24} />
        </span>
      )}
      <span>{props.label}</span>
    </FormButton>
  );
};

export default Button;
