import type { Meta, StoryObj } from '@storybook/react';
import { SvgRectangle } from './svg-rectangle';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof SvgRectangle> = {
  component: SvgRectangle,
  title: 'SvgRectangle',
};
export default meta;
type Story = StoryObj<typeof SvgRectangle>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to SvgRectangle!/gi)).toBeTruthy();
  },
};
