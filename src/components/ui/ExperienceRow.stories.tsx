import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ExperienceRow } from './ExperienceRow';
import { experience } from '@/data/site';

const meta = {
  title: 'UI/ExperienceRow',
  component: ExperienceRow,
  args: {
    item: experience[0]!,
    locale: 'en',
    presentLabel: 'Present',
  },
  decorators: [
    (Story) => (
      <ul className="border-rule border-b">
        <Story />
      </ul>
    ),
  ],
} satisfies Meta<typeof ExperienceRow>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Ongoing role — the end date renders as the localized "Present". */
export const Current: Story = {};

export const Past: Story = {
  args: { item: experience[1]! },
};

export const Thai: Story = {
  args: { locale: 'th', presentLabel: 'ปัจจุบัน' },
};

export const FullHistory: Story = {
  render: (args) => (
    <>
      {experience.map((item) => (
        <ExperienceRow key={item.company} {...args} item={item} />
      ))}
    </>
  ),
};
