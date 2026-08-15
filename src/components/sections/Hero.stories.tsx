import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Hero } from './Hero';

const meta = {
  title: 'Sections/Hero',
  component: Hero,
  args: { locale: 'en' },
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const English: Story = {};

/** The Thai headline is the clearest check that Anuphan is wired up. */
export const Thai: Story = {
  args: { locale: 'th' },
};
