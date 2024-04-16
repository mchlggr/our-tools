import styled from 'tailwind';

/* eslint-disable-next-line */
export interface ViewThreeProps {}

const StyledViewThree = styled.div`
  color: pink;
`;

export function ViewThree(props: ViewThreeProps) {
  return (
    <StyledViewThree>
      <h1>Welcome to ViewThree!</h1>
    </StyledViewThree>
  );
}

export default ViewThree;
