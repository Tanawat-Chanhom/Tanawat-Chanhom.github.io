import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Footer } from './Footer';

const meta = {
  title: 'Layout/Footer',
  component: Footer,
  args: { locale: 'en' },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const English: Story = {};

export const Thai: Story = {
  args: { locale: 'th' },
};
