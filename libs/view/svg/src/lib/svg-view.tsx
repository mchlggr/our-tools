import styled from 'tailwind';

/* eslint-disable-next-line */
export interface SvgViewProps {}

const StyledSvgView = styled.div`
  color: pink;
`;

export function SvgView(props: SvgViewProps) {
  return (
    <StyledSvgView>
      <h1>Welcome to SvgView!</h1>
    </StyledSvgView>
  );
}

export default SvgView;
