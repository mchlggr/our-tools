import type { Meta, StoryObj } from '@storybook/react';
import { ViewSvg } from './view-svg';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof ViewSvg> = {
  component: ViewSvg,
  title: 'ViewSvg',
};
export default meta;
type Story = StoryObj<typeof ViewSvg>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to ViewSvg!/gi)).toBeTruthy();
  },
};
