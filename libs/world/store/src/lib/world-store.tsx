import styles from './world-store.module.css';

/* eslint-disable-next-line */
export interface WorldStoreProps {}

export function WorldStore(props: WorldStoreProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to WorldStore!</h1>
    </div>
  );
}

export default WorldStore;
