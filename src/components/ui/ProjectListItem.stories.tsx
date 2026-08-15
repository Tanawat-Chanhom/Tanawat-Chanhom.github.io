import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ProjectListItem } from './ProjectListItem';
import type { ProjectEntry } from '@/lib/content';

const baseProject: ProjectEntry = {
  title: 'Atlas Analytics',
  description: 'A real-time analytics dashboard.',
  category: 'WEB APP',
  date: '2026-05-12',
  link: 'https://example.com',
  cover: '/images/projects/atlas-analytics.svg',
  coverAlt: 'Atlas Analytics dashboard',
  draft: false,
  featured: true,
  tags: ['Next.js', 'TypeScript'],
  slug: 'atlas-analytics',
  resolvedLocale: 'en',
  isFallback: false,
  year: '2026',
  body: '',
};

const meta = {
  title: 'UI/ProjectListItem',
  component: ProjectListItem,
  args: { project: baseProject, locale: 'en', viewLabel: 'View project' },
  decorators: [
    (Story) => (
      <ul className="border-rule border-b">
        <Story />
      </ul>
    ),
  ],
} satisfies Meta<typeof ProjectListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Hover the row to reveal the thumbnail. The reveal is CSS-only and gated
 * behind `@media (hover: hover)`, so it will not appear on a touch device.
 */
export const Default: Story = {};

/** Cover is optional — the row must stay aligned without one. */
export const WithoutThumbnail: Story = {
  args: {
    project: { ...baseProject, cover: undefined, coverAlt: undefined },
  },
};

export const LongTitle: Story = {
  args: {
    project: {
      ...baseProject,
      title: 'Meridian Design System',
      category: 'DESIGN SYSTEM',
    },
  },
};

export const Thai: Story = {
  args: {
    locale: 'th',
    viewLabel: 'ดูผลงาน',
    project: { ...baseProject, title: 'ระบบวิเคราะห์ข้อมูล', category: 'เว็บแอป' },
  },
};

/** Several rows together — the shared rules should read as one continuous list. */
export const List: Story = {
  render: (args) => (
    <>
      <ProjectListItem {...args} />
      <ProjectListItem
        {...args}
        project={{
          ...baseProject,
          slug: 'northwind-commerce',
          title: 'Northwind Commerce',
          category: 'E-COMMERCE',
          year: '2026',
          cover: '/images/projects/northwind-commerce.svg',
        }}
      />
      <ProjectListItem
        {...args}
        project={{
          ...baseProject,
          slug: 'harbor-docs',
          title: 'Harbor Docs',
          category: 'PLATFORM',
          year: '2025',
          cover: '/images/projects/harbor-docs.svg',
        }}
      />
    </>
  ),
};
