import React from 'react';
import styles from '@/styles/CardDescription.module.scss';
import { CardDescriptionProps } from '@/interfaces/cardDescriptionProps';
import { IMAGE_REGEX } from '@/constants';

const CardDescription = (props: CardDescriptionProps) => {
  const formatDescription = (description: string) => {
    const regex = IMAGE_REGEX;
    const formattedDescription = description.replace(regex, (match, p1) => {
      return `<img class="${styles.cardImage}" src="${p1}"`;
    });
    return formattedDescription;
  };
  return (
    <div className={styles.description__conatiner}>
      <div
        className={styles.description}
        dangerouslySetInnerHTML={{
          __html: formatDescription(props.description as string),
        }}
      ></div>
    </div>
  );
};

export default CardDescription;
