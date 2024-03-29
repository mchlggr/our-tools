import styles from './edit-pointer-ui.module.css';

/* eslint-disable-next-line */
export interface EditPointerUiProps {}

export function EditPointerUi(props: EditPointerUiProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to EditPointerUi!</h1>
    </div>
  );
}

export default EditPointerUi;
