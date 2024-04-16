import type { Meta, StoryObj } from '@storybook/react';
import { SvgLine } from './svg-line';

const meta: Meta<typeof SvgLine> = {
  component: SvgLine,
  title: 'View/Svg/Line',
};
export default meta;
type Story = StoryObj<typeof SvgLine>;

export const Normal = {
  args: {},
};
