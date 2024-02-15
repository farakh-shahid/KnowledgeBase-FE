import React, { CSSProperties, useEffect, useRef, useState } from "react";
import styled from "styled-components";
type MenuProps = {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  parentRef?: React.RefObject<
    HTMLInputElement | HTMLDivElement | HTMLButtonElement
  >;
  style?: CSSProperties;
  renderItem?: JSX.Element;
};
const PopUp = styled.div.attrs(
  (props: { width: string; margin?: string }) => props
)`
  z-index: 10000;
  min-width: fit-content;
  border: 1px solid rgb(240, 238, 238);
  margin-top: 2.6rem;
  background: #fff;
  position: absolute;
  float: left;
  margin-right: 1vw;
  border-radius: 0.5rem;
  min-height: fit-content;
`;
const PopUpMenu = (props: MenuProps) => {
  const popUpref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.body.addEventListener("click", listenToClick);
    document.body.addEventListener("scroll", listenToScroll);

    return () => {
      document.body.removeEventListener("click", listenToClick);
      document.body.removeEventListener("scroll", listenToScroll);
    };
  }, []);
  const listenToScroll = () => {
    props.setVisible(false);
  };
  const listenToClick = (e: MouseEvent) => {
    const target = e.target as HTMLDivElement;
    if (
      popUpref.current &&
      !popUpref.current.contains(target) &&
      !props.parentRef?.current?.contains(target)
    ) {
      props.setVisible(false);
    }
  };
  return (
    <PopUp ref={popUpref} style={props.style}>
      {props.renderItem}
    </PopUp>
  );
};

export default PopUpMenu;
