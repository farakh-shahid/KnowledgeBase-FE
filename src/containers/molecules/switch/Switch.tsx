import React from "react";
import styles from "@/styles/Switch.module.scss";
const ToggleSwitch = ({
  isToggled,
  onToggle,
}: {
  isToggled: boolean;
  onToggle: React.ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <label className={styles.toggle__switch}>
      <input type='checkbox' checked={isToggled} onChange={onToggle} />
      <span className={styles.switch} />
    </label>
  );
};
export default ToggleSwitch;
