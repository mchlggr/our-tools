import type { Meta, StoryObj } from '@storybook/react';
import { SvgText } from './svg-text';
import { viewTextNormal } from '@our-tools/view-example';
import SvgStoryDecorator from './svg-story';

const meta: Meta<typeof SvgText> = {
  component: SvgText,
  title: 'View/Svg/Text',
  decorators: SvgStoryDecorator
};
export default meta;
type Story = StoryObj<typeof SvgText>;

export const Normal = {
  args: viewTextNormal,
};
