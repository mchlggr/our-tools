import type { Meta, StoryObj } from '@storybook/react';
import { SvgHtml } from './svg-html';

import SvgStoryDecorator from './svg-story';

const meta: Meta<typeof SvgHtml> = {
  component: SvgHtml,
  title: 'View/Svg/Html',
  decorators: SvgStoryDecorator
};
export default meta;
type Story = StoryObj<typeof SvgHtml>;

export const Primary = {
  args: {},
};
