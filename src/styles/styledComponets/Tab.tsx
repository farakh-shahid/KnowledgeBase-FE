import styled from "styled-components";

export const Tab = styled.button.attrs((props: { active: boolean }) => props)`
  font-size: 14px;
  padding: 10px 20px;
  cursor: pointer;
  opacity: 0.6;
  color: black;
  font-family: Helvetica;
  background: white;
  font-weight: 400;
  border: 0;
  outline: 0;
  ${(props) =>
    props.active &&
    `
    border-bottom: 2px solid black;
    opacity: 1;
  `}
`;
