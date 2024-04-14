import styled from 'tailwind';

/* eslint-disable-next-line */
export interface ViewWindowProps {}

const StyledViewWindow = styled.div`
  color: pink;
`;

export function ViewWindow(props: ViewWindowProps) {
  return (
    <StyledViewWindow>
      <h1>Welcome to ViewWindow!</h1>
    </StyledViewWindow>
  );
}

export default ViewWindow;
