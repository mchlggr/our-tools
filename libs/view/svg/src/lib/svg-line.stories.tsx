import type { Meta, StoryObj } from '@storybook/react';
import { SvgLine } from './svg-line';
import { viewPencilNormal } from '@our-tools/view-example';
import SvgStoryDecorator from './svg-story';

const meta: Meta<typeof SvgLine> = {
  component: SvgLine,
  title: 'View/Svg/Line',
  decorators: SvgStoryDecorator
};
export default meta;
type Story = StoryObj<typeof SvgLine>;

export const Normal = {
  args: viewPencilNormal,
};
