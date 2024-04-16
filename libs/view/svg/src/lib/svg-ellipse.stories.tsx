import type { Meta, StoryObj } from '@storybook/react';
import { SvgEllipse } from './svg-ellipse';

import { viewEllipseNormal } from '@our-tools/view-example';
import SvgStoryDecorator from './svg-story';

const meta: Meta<typeof SvgEllipse> = {
  component: SvgEllipse,
  title: 'View/Svg/Ellipse',
  decorators: SvgStoryDecorator
};
export default meta;
type Story = StoryObj<typeof SvgEllipse>;

export const Normal = {
  args: viewEllipseNormal,
};

