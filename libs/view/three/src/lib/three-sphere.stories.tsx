import type { Meta, StoryObj } from '@storybook/react';
import { ThreeSphere } from './three-sphere';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { ThreeStory } from './three-story';
import { Vector3 } from 'three';

const meta: Meta<typeof ThreeSphere> = {
  component: ThreeSphere,
  title: 'View/Three/Sphere',
  decorators: (Story) => <ThreeStory cameraPosition={new Vector3(0, 10, 40)}>
    <Story/>
  </ThreeStory>
};
export default meta;
type Story = StoryObj<typeof ThreeSphere>;

export const Normal = {
  args: {},
};
