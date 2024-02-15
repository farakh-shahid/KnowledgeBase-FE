import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import style from '@/styles/Header.module.scss';
import styled from 'styled-components';
import { colors } from '@/assets/colors';
import { useAvatarProps } from '@/interfaces/userAvatarProps';
import Image from 'next/image';

const Avatar = styled.button.attrs((props: { size: number }) => props)`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: ${(props) => props.size / 2}px;
  align-items: center;
  border: none;
  justify-content: center;
  display: flex;
  cursor: pointer;
`;
const UserAvatar = (props: useAvatarProps) => {
  return (
    <div className={style.user__avatar_arrow_down} onClick={props.onClick}>
      <Avatar size={props.size} ref={props.avatar_ref}>
        {props.avatar_url ? (
          <Image
            src={props.avatar_url}
            width={props.iconSize}
            alt="_avatar"
            height={props.iconSize}
            className={style.image}
          ></Image>
        ) : (
          <FontAwesomeIcon icon={faUser} width={props.iconSize} color="white" />
        )}
      </Avatar>
    </div>
  );
};

export default UserAvatar;
