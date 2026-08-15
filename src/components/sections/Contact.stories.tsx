import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Contact } from './Contact';

const meta = {
  title: 'Sections/Contact',
  component: Contact,
  args: { locale: 'en' },
} satisfies Meta<typeof Contact>;

export default meta;
type Story = StoryObj<typeof meta>;

export const English: Story = {};

export const Thai: Story = {
  args: { locale: 'th' },
};
