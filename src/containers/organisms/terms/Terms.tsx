import styles from "@/styles/TopicPage.module.scss";

const Terms = () => {
  return (
    <p className={styles.terms}>
      <em>By clicking “Post Your Feedback, you agree to our </em>
      <a href='' rel='noopener noreferrer' target='_blank'>
        <em>terms of service</em>
      </a>
      <em>, </em>
      <a href='' rel='noopener noreferrer' target='_blank'>
        <em>privacy policy</em>
      </a>
      <em> and </em>
      <a href='' rel='noopener noreferrer' target='_blank'>
        <em>cookie policy</em>
      </a>
    </p>
  );
};
export default Terms;
