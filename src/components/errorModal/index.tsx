import styles from "./index.module.scss";

interface ErrorModalProps {
  isOpen: boolean;
  handleClose(): void;
}

export const ErrorModal: React.FC<ErrorModalProps> = (props) => {
  const { isOpen, handleClose } = props;

  return (
    <div
      className={`${styles.error} ${isOpen ? styles.visible : styles.hidden}`}
    >
      <span>Произошла ошибка. Рекомендуем обновить страницу.</span>
      <button className={styles.button} onClick={handleClose}>
        Закрыть
      </button>
    </div>
  );
};
