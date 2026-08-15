import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { LocaleSwitch } from './LocaleSwitch';

const meta = {
  title: 'Layout/LocaleSwitch',
  component: LocaleSwitch,
  args: { currentLocale: 'en', path: '/', label: 'Language' },
} satisfies Meta<typeof LocaleSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The active locale is plain text with aria-current, not a link. */
export const OnEnglish: Story = {};

export const OnThai: Story = {
  args: { currentLocale: 'th' },
};

/** Deep link — switching language should stay on the same project. */
export const DeepPath: Story = {
  args: { path: '/projects/atlas-analytics' },
};
