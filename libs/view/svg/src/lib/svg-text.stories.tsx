import type { Meta, StoryObj } from '@storybook/react';
import { SvgText } from './svg-text';

const meta: Meta<typeof SvgText> = {
  component: SvgText,
  title: 'View/Svg/Text',
};
export default meta;
type Story = StoryObj<typeof SvgText>;

export const Normal = {
  args: {},
};
