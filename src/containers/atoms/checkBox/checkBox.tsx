import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
}

const CheckboxInput = styled.input.attrs({ type: 'checkbox' })<CheckboxProps>`
  position: relative;
  width: 18px;
  height: 18px;
  border-radius: 5px;
  background-color: ${({ checked }) => (checked ? '#0EBBB2' : 'white')};
  border: 1px solid ${({ checked }) => (checked ? '#0EBBB2' : '#0EBBB2')};
  appearance: none;
  outline: none;
  cursor: pointer;
  &:checked {
    background-color: '#0EBBB2';
    border-color: '#0EBBB2';
  }
  &:after {
    content: '';
    display: ${({ checked }) => (checked ? 'block' : 'none')};
    position: absolute;
    top: 2px;
    left: 5px;
    width: 5px;
    height: 11px;
    border: solid white;
    border-width: 0px 2px 2px 0;
    transform: rotate(45deg);
  }
`;

const CheckboxText = styled.span`
  margin-left: 0.5rem;
`;

const CheckBox = (props: any) => {

  return (
    <>
      <CheckboxInput {...props} />
      <CheckboxText>{props.label}</CheckboxText>
    </>
  );
};

export default CheckBox;
