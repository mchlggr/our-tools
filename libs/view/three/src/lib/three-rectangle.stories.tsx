import type { Meta, StoryObj } from '@storybook/react';
import { ThreeRectangle } from './three-rectangle';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof ThreeRectangle> = {
  component: ThreeRectangle,
  title: 'ThreeRectangle',
};
export default meta;
type Story = StoryObj<typeof ThreeRectangle>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to ThreeRectangle!/gi)).toBeTruthy();
  },
};
