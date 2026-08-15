import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SocialLinks } from './SocialLinks';

const meta = {
  title: 'UI/SocialLinks',
  component: SocialLinks,
  args: { label: 'Social profiles' },
} satisfies Meta<typeof SocialLinks>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Icon-only — each link relies on aria-label for its accessible name. */
export const IconsOnly: Story = {};

export const WithLabels: Story = {
  args: { showLabels: true },
};

export const Stacked: Story = {
  args: { showLabels: true, className: 'flex-col items-start gap-3' },
};
