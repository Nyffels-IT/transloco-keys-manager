import fs from 'fs-extra';

import { Config, Translation } from '../types';

import { createTranslation } from './utils/create-translation';
import { getCurrentTranslation } from './utils/get-current-translation';
import { mergeDeep } from '../utils/object.utils';
import { DefaultValues } from '.';

export interface FileAction {
  path: string;
  type: 'new' | 'modified';
}

interface BuildTranslationOptions
  extends Required<Pick<Config, 'fileFormat'>>,
    Partial<Pick<Config, 'replace' | 'removeExtraKeys' | 'defaultLanguage'>> {
  path: string;
  translation?: Translation;
}

export function buildTranslationFile(
  {
    path,
    translation = {},
    replace = false,
    removeExtraKeys = false,
    fileFormat,
  }: BuildTranslationOptions,
  markerDefault: boolean = false,
): FileAction {
  const currentTranslation = getCurrentTranslation({ path, fileFormat });

  if (markerDefault) {
    let defaultTranslations = {} as any;
    for (let value of DefaultValues.getDefaultValues()) {
      defaultTranslations[value.key] = value.value;
    }

    translation = mergeDeep({}, translation, defaultTranslations);
  }

  fs.outputFileSync(
    path,
    createTranslation({
      currentTranslation,
      translation,
      replace,
      removeExtraKeys,
      fileFormat,
    }),
  );

  return { type: currentTranslation ? 'modified' : 'new', path };
}
