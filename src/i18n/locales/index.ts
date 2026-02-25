import { en } from './en';
import { de } from './de';
import { ru } from './ru';
import { it } from './it';

export const locales = {
  en,
  de,
  ru,
  it,
};

export type SupportedLanguage = keyof typeof locales;
export type { Translation } from './en';
