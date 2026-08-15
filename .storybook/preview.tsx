import type { Preview, Decorator } from '@storybook/nextjs-vite';
import React from 'react';
import '../src/app/globals.css';
import './storybook-fonts.css';

/**
 * Wraps every story in the site's dark surface and applies the correct
 * `lang` for the selected locale, so Thai stories render with Thai font
 * fallback behaviour and the a11y addon sees a valid language.
 */
const withTheme: Decorator = (Story, context) => {
  const locale = (context.globals.locale as string) ?? 'en';

  return (
    <div lang={locale} className="bg-bg text-fg min-h-24 p-8">
      <Story />
    </div>
  );
};

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    locale: {
      description: 'Locale — switch to TH to check Thai typography and fallbacks',
      defaultValue: 'en',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'en', title: 'English' },
          { value: 'th', title: 'ไทย' },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    a11y: {
      // Surface violations in CI rather than only in the panel.
      test: 'error',
    },
  },
};

export default preview;
