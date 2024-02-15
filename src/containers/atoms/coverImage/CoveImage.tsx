import Image from 'next/image';
import React from 'react';
import { CoverImageProps } from '@/interfaces/coverImageProps';

const CoverImage = (props: CoverImageProps) => {
  if (!props.image_url) {
    return null;
  }
  return <Image src={props.image_url} alt="" fill />;
};

export default CoverImage;
