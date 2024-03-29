import styles from './view-shared.module.css';

/* eslint-disable-next-line */
export interface ViewSharedProps {}

export function ViewShared(props: ViewSharedProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ViewShared!</h1>
    </div>
  );
}

export default ViewShared;
