import type { Meta, StoryObj } from '@storybook/react';
import { SvgPencil } from './svg-pencil';
import SvgStoryDecorator from './svg-story';
import { viewPencilNormal } from '@our-tools/view-example';

const meta: Meta<typeof SvgPencil> = {
  component: SvgPencil,
  title: 'View/Svg/Pencil',
  decorators: SvgStoryDecorator
};
export default meta;
type Story = StoryObj<typeof SvgPencil>;

export const Normal = {
  args: viewPencilNormal,
};
