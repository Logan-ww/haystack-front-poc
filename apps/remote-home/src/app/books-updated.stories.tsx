import type { Meta, StoryObj } from '@storybook/react';
import { UpdatedBooks } from './books-updated';

import { MockedProvider } from '@apollo/client/testing';
import { bookMocks } from '../mocks/bookMocks';

const meta: Meta<typeof UpdatedBooks> = {
  component: UpdatedBooks,
  title: 'UpdatedBooks',
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
type Story = StoryObj<typeof UpdatedBooks>;

export const Default = {
  args: {},
};
