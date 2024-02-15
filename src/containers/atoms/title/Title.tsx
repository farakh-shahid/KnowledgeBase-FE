import styles from "@/styles/Title.module.scss";
interface Props {
  label?: string;
}

const Title = (props: Props) => {
  return <p className={styles.label}>{props.label}</p>;
};

export default Title;
