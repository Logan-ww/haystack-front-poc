import type { Meta, StoryObj } from '@storybook/react';
import { Books } from './books';

import { within, userEvent, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { MockedProvider } from '@apollo/client/testing';
import { bookMocks } from '../mocks/bookMocks';

const meta: Meta<typeof Books> = {
  component: Books,
  title: 'Books',
  decorators: [
    (Story) => (
      <MockedProvider mocks={bookMocks} addTypename={false}>
        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
        <Story />
      </MockedProvider>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof Books>;

export const Default: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      expect(canvas.getByRole('button')).toBeInTheDocument();
    });

    // 👇 Simulate interactions with the component
    await userEvent.click(canvas.getByRole('button'));

    // 👇 Assert DOM structure
    await expect(
      canvas.getByText(
        (_, element) => element?.textContent === 'New Book by New Author'
      )
    ).toBeInTheDocument();
  },
};
Default.parameters = {
  percy: {
    name: 'Books - Default',
  },
};

export const AddButtonHidden: Story = {
  args: {
    hideButton: true,
  },
};
AddButtonHidden.parameters = {
  percy: {
    name: 'Books - Add button hidden',
  },
};
