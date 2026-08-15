import { z } from 'zod';

/**
 * Frontmatter contract for `content/projects/<locale>/<slug>.md`.
 *
 * Validated at build time so a typo in a new project file fails the build with
 * a precise message, instead of silently deploying an empty row. That matters
 * because the publishing workflow is "add a markdown file, push, walk away".
 */
export const projectFrontmatterSchema = z.object({
  title: z.string().min(1, 'title is required'),
  description: z.string().min(1, 'description is required'),
  /** Small mono label shown on the left of each row, e.g. "WEB APP". */
  category: z.string().min(1, 'category is required'),
  /** ISO date (YYYY-MM-DD). Drives sort order and the year column. */
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'date must be in YYYY-MM-DD format')
    .refine((value) => !Number.isNaN(Date.parse(value)), 'date must be a real calendar date'),
  /** Optional external URL — becomes the "View live" button on the detail page. */
  link: z.url('link must be a valid URL').optional(),
  /** Optional thumbnail revealed on row hover. Path under /public. */
  cover: z.string().startsWith('/', 'cover must be an absolute path under /public').optional(),
  /** Alt text for the cover. Required whenever a cover is set (see refine below). */
  coverAlt: z.string().optional(),
  /** Set true to keep a file in the repo without publishing it. */
  draft: z.boolean().optional().default(false),
  /** Pins a project to the top of the list regardless of date. */
  featured: z.boolean().optional().default(false),
  /** Optional tech tags rendered on the detail page. */
  tags: z.array(z.string()).optional().default([]),
});

export type ProjectFrontmatter = z.infer<typeof projectFrontmatterSchema>;

/**
 * A cover with no alt text is an accessibility defect, so make it a build
 * error rather than something to catch later in a Lighthouse run.
 */
export const projectSchema = projectFrontmatterSchema.refine(
  (data) => !data.cover || (data.coverAlt !== undefined && data.coverAlt.trim().length > 0),
  { message: 'coverAlt is required whenever cover is set', path: ['coverAlt'] },
);
