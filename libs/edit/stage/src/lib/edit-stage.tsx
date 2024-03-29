import styles from './edit-stage.module.css';

/* eslint-disable-next-line */
export interface EditStageProps {}

export function EditStage(props: EditStageProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to EditStage!</h1>
    </div>
  );
}

export default EditStage;
