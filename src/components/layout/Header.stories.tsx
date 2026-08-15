import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Header } from './Header';

const meta = {
  title: 'Layout/Header',
  component: Header,
  args: { locale: 'en', path: '/' },
  decorators: [
    (Story) => (
      // The header is fixed; this gives it room and something to overlap.
      <div className="relative h-64">
        <Story />
        <p className="text-dim px-6 pt-24">Page content sits beneath the blurred header.</p>
      </div>
    ),
  ],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const English: Story = {};

export const Thai: Story = {
  args: { locale: 'th' },
};

/** On a project page the language switch must preserve the current path. */
export const OnProjectPage: Story = {
  args: { path: '/projects/atlas-analytics' },
};
