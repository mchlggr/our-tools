import type { Meta, StoryObj } from '@storybook/react';
import { SvgPencil } from './svg-pencil';

const meta: Meta<typeof SvgPencil> = {
  component: SvgPencil,
  title: 'View/Svg/Pencil',
};
export default meta;
type Story = StoryObj<typeof SvgPencil>;

export const Normal = {
  args: {},
};
