import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ExperienceRow } from './ExperienceRow';
import { education, experience } from '@/data/site';

const internship = experience[experience.length - 1]!;

const meta = {
  title: 'UI/ExperienceRow',
  component: ExperienceRow,
  args: {
    item: internship,
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

/** A multi-year range with a summary and a note. */
export const Default: Story = {};

/** Ongoing role — a null end date renders as the localized "Present". */
export const Current: Story = {
  args: { item: { ...internship, end: null } },
};

/** Start and end in the same year collapse to a single year. */
export const SingleYear: Story = {
  args: { item: experience[1]! },
};

/** No summary and no note — the row must stay aligned without them. */
export const Minimal: Story = {
  args: { item: education[1]! },
};

export const Thai: Story = {
  args: { locale: 'th', presentLabel: 'ปัจจุบัน' },
};

export const FullHistory: Story = {
  render: (args) => (
    <>
      {experience.map((item) => (
        <ExperienceRow key={`${item.org}-${item.start}`} {...args} item={item} />
      ))}
    </>
  ),
};
