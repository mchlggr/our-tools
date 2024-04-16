import { Suspense } from 'react';
import type { Preview } from '@storybook/react'

import './index.css'

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <Suspense fallback={null}>
        <Story />
      </Suspense>
    ),
  ],
}
export default preview
