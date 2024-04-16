import { ViewLineProps, ViewRectangleProps } from '@our-tools/view-shared';

export interface SvgHtmlProps {
  view?: ViewLineProps | ViewRectangleProps
}

export function SvgHtml(props: SvgHtmlProps) {
  return (
    <foreignObject x="10" y="10" width="200" height="100"  transform="scale(0.25,0.25)">
      <div style={{font: "18px serif", overflow: "auto"}}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis mollis
        mi ut ultricies. Nullam magna ipsum, porta vel dui convallis, rutrum
        imperdiet eros. Aliquam erat volutpat.
      </div>
    </foreignObject>
  );
}

export default SvgHtml;
