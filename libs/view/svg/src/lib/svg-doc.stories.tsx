import type { Meta, StoryObj } from '@storybook/react';
import { SvgDoc, DisplaySvgProps } from './svg-doc';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: { component: (props: DisplaySvgProps) => JSX.Element; title: string } = {
  component: SvgDoc,
  title: 'DisplayDoc',
};
export default meta;
type Story = StoryObj<typeof SvgDoc>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to SvgDoc!/gi)).toBeTruthy();
  },
};
