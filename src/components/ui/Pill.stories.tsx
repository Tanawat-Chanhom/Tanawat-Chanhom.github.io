import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Pill } from './Pill';
import { skills } from '@/data/site';

const meta = {
  title: 'UI/Pill',
  component: Pill,
  args: { children: 'TypeScript' },
} satisfies Meta<typeof Pill>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Thai text runs taller than Latin — check the pill still centres cleanly. */
export const ThaiLabel: Story = {
  args: { children: 'ออกแบบระบบ' },
};

export const FullStack: Story = {
  render: () => (
    <ul className="flex max-w-2xl flex-wrap gap-3">
      {skills.map((skill) => (
        <li key={skill}>
          <Pill>{skill}</Pill>
        </li>
      ))}
    </ul>
  ),
};
