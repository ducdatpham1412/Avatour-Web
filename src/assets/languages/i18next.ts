import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import { logger } from '@/lib';

import en from './en.json';
import vi from './vi.json';

i18next
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: {
      en: {
        translation: en,
      },
      vi: {
        translation: vi,
      },
    },
    fallbackLng: 'vi',
    interpolation: {
      escapeValue: false,
    },
    nsSeparator: false,
  })
  .catch(logger.log);

type ResourceLanguage = typeof en & typeof vi;
export type I18Normalize = RecursiveKeyOf<ResourceLanguage>;

type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<TObj[TKey], `${TKey}`>;
}[keyof TObj & (string | number)];

type RecursiveKeyOfInner<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
    TObj[TKey],
    `['${TKey}']` | `.${TKey}`
  >;
}[keyof TObj & (string | number)];

type RecursiveKeyOfHandleValue<TValue, Text extends string> = TValue extends any[]
  ? Text
  : TValue extends object
  ? Text | `${Text}${RecursiveKeyOfInner<TValue>}`
  : Text;

export default i18next;
