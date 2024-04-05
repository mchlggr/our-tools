import styles from './world-doc.module.css';

/* eslint-disable-next-line */
export interface WorldDocProps {}

export function WorldDoc(props: WorldDocProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to WorldDoc!</h1>
    </div>
  );
}

export default WorldDoc;
