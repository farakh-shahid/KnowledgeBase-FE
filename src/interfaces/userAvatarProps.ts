import React from "react";

export interface useAvatarProps {
  size: number;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  iconSize: number;
  avatar_url: string | undefined;
  avatar_ref?: React.RefObject<HTMLButtonElement>;
}
