import { en, type Dictionary } from './dictionaries/en';
import { th } from './dictionaries/th';
import type { Locale } from './config';

const dictionaries: Record<Locale, Dictionary> = { en, th };

/**
 * Returns the dictionary for a locale.
 *
 * Synchronous and plain-object by design: this is called from Server
 * Components, so strings are baked into the HTML at build time and no
 * translation code is shipped to the browser.
 */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
export * from './config';
