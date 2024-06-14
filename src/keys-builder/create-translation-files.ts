import { DefaultValues } from '.';
import { messages } from '../messages';
import { Config, ScopeMap } from '../types';
import { getLogger } from '../utils/logger';
import { buildScopeFilePaths } from '../utils/path.utils';

import { buildTranslationFile, FileAction } from './build-translation-file';
import { runPrettier } from './utils/run-prettier';

export async function createTranslationFiles({
  scopeToKeys,
  langs,
  output,
  replace,
  removeExtraKeys,
  scopes,
  fileFormat,
  defaultLanguage,
}: Config & { scopeToKeys: ScopeMap }) {
  const logger = getLogger();

  const scopeFiles = buildScopeFilePaths({
    aliasToScope: scopes.aliasToScope,
    langs,
    output,
    fileFormat,
  });
  const globalFiles = langs.map((lang) => ({
    path: `${output}/${lang}.${fileFormat}`,
    lang,
  }));
  const actions: FileAction[] = [];

  for (const { path, lang } of globalFiles) {
    actions.push(
      buildTranslationFile(
        {
          path,
          translation: scopeToKeys.__global,
          replace,
          removeExtraKeys,
          fileFormat,
        },
        lang == defaultLanguage,
      ),
    );
  }

  for (const { path, scope, lang } of scopeFiles) {
    actions.push(
      buildTranslationFile(
        {
          path,
          translation: scopeToKeys[scope],
          replace,
          removeExtraKeys,
          fileFormat,
        },
        lang == defaultLanguage,
      ),
    );
  }

  if (fileFormat === 'json') {
    await runPrettier(actions.map(({ path }) => path));
  }

  const newFiles = actions.filter((action) => action.type === 'new');

  if (newFiles.length) {
    logger.success(`${messages.creatingFiles} 🗂`);
    logger.log(newFiles.map((action) => action.path).join('\n'));
  }

  logger.log(`\n              🌵 ${messages.done} 🌵`);
}
