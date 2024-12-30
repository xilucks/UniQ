import type { ESLintUtils } from '@typescript-eslint/utils';
import airbnbConfig from 'eslint-config-airbnb-base';
import airbnbTsConfig from 'eslint-config-airbnb-typescript/base';
import folderNamingRule from './rules/folder-naming-convention.js';
import componentExportStyleRule from './rules/component-export-style.js';
import componentNameCaseRule from './rules/component-name-case.js';
import componentInnerArrowFunctionRule from './rules/component-inner-arrow-function.js';
import arrowFunctionCommentRule from './rules/arrow-function-comment.js';
import noConsoleLogRule from './rules/no-console-log.js';

const config = {
  rules: {
    'folder-naming-convention': folderNamingRule as ESLintUtils.RuleModule<string, []>,
    'component-export-style': componentExportStyleRule as ESLintUtils.RuleModule<string, []>,
    'component-name-case': componentNameCaseRule as ESLintUtils.RuleModule<string, []>,
    'component-inner-arrow-function': componentInnerArrowFunctionRule as ESLintUtils.RuleModule<string, []>,
    'arrow-function-comment': arrowFunctionCommentRule as ESLintUtils.RuleModule<string, []>,
    'no-console-log': noConsoleLogRule as ESLintUtils.RuleModule<string, []>,
  },
  configs: {
    recommended: {
      extends: [
        'airbnb-base',
        'airbnb-typescript/base'
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json'
      },
      plugins: ['qslint'],
      rules: {
        ...airbnbConfig.rules,
        ...airbnbTsConfig.rules,
        'qslint/folder-naming-convention': 'error',
        'qslint/component-export-style': 'error',
        'qslint/component-name-case': 'error',
        'qslint/component-inner-arrow-function': 'error',
        'qslint/arrow-function-comment': 'error',
        'qslint/no-console-log': 'error',
      },
    },
  },
} as const;

export = config;
