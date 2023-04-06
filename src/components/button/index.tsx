import styles from "./index.module.scss";

interface ButtonProps {
  onClick(): void;
  value: string;
}

export const Button = ({ onClick, value }: ButtonProps) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {value}
    </button>
  );
};
