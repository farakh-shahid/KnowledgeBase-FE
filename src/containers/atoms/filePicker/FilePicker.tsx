import styles from '@/styles/FilePicker.module.scss';
import React from 'react';
type Props = {
  onChange: (files: { target: { files: any } }) => void;
  coverUrl: string | null | undefined;
};

const FilePicker = (props: Props) => {
  const label = props.coverUrl ? 'Change Cover Photo' : 'Add a cover image';

  return (
    <div className={styles.choose__image__wrap}>
      <label className={styles.label}>
        {label}
        <input
          type="file"
          accept="image/*"
          className={styles.choose__image}
          onChange={props.onChange}
        />
      </label>
    </div>
  );
};

export default FilePicker;
