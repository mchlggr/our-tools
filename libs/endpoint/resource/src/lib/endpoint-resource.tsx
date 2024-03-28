import styles from './endpoint-resource.module.css';

/* eslint-disable-next-line */
export interface EndpointResourceProps {}

export function EndpointResource(props: EndpointResourceProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to EndpointResource!</h1>
    </div>
  );
}

export default EndpointResource;
