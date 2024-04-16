import type { Meta, StoryObj } from '@storybook/react';
import { renderRectangleNormal, renderRectangleSelected } from '@our-tools/view-example';
import { SvgRectangle } from './svg-rectangle';

import SvgStoryDecorator from './svg-story';

const meta: Meta<typeof SvgRectangle> = {
  component: SvgRectangle,
  title: 'View/Svg/Rectangle',
  decorators: SvgStoryDecorator,
};

export default meta;
type Story = StoryObj<typeof SvgRectangle>;

export const Normal = {
  args: renderRectangleNormal
};

// export const Selected = {
//   args: renderRectangleSelected
// };


