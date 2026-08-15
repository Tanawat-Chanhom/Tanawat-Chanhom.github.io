import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SectionHeading } from './SectionHeading';

const meta = {
  title: 'UI/SectionHeading',
  component: SectionHeading,
  args: {
    eyebrow: 'About',
    id: 'story-heading',
    children: 'Selected Work',
  },
} satisfies Meta<typeof SectionHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LongStatement: Story = {
  args: { children: 'I build fast, accessible web interfaces that get out of the way.' },
};

/** Thai headlines need Anuphan — Archivo has no Thai glyphs at all. */
export const Thai: Story = {
  args: {
    eyebrow: 'เกี่ยวกับ',
    children: 'ผมสร้างเว็บอินเทอร์เฟซที่เร็ว เข้าถึงได้ และไม่ขวางทางผู้ใช้',
  },
};
