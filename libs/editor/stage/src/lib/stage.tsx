import styles from './stage.module.css';

/* eslint-disable-next-line */
export interface StageProps {}

export function Stage(props: StageProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Stage!</h1>
    </div>
  );
}

export default Stage;
