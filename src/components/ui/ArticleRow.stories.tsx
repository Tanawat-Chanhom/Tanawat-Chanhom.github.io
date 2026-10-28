import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ArticleRow } from './ArticleRow';
import { articles } from '@/data/site';

const meta = {
  title: 'UI/ArticleRow',
  component: ArticleRow,
  args: {
    article: articles[0]!,
    locale: 'en',
    readLabel: 'Read on Medium',
    langLabel: 'Written in Thai',
  },
  decorators: [
    (Story) => (
      <ul className="border-rule border-b">
        <Story />
      </ul>
    ),
  ],
} satisfies Meta<typeof ArticleRow>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * English page, Thai post — the right column notes the language. Hover
 * anywhere on the row: the whole row is the link.
 */
export const Default: Story = {};

/** Same language as the page — no language note. */
export const Thai: Story = {
  args: { locale: 'th', readLabel: 'อ่านต่อบน Medium', langLabel: undefined },
};

export const List: Story = {
  render: (args) => (
    <>
      {articles.map((article) => (
        <ArticleRow key={article.href} {...args} article={article} />
      ))}
    </>
  ),
};
