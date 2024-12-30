import type { ESLintUtils } from '@typescript-eslint/utils';
import airbnbConfig from 'eslint-config-airbnb';
import airbnbTsConfig from 'eslint-config-airbnb-typescript';
import airbnbHooksConfig from 'eslint-config-airbnb/hooks';
import componentExportStyleRule from './rules/component-export-style.js';
import componentNameCaseRule from './rules/component-name-case.js';
import componentInnerArrowFunctionRule from './rules/component-inner-arrow-function.js';
import arrowFunctionCommentRule from './rules/arrow-function-comment.js';
import noConsoleLogRule from './rules/no-console-log.js';

const config = {
  rules: {
    'component-export-style': componentExportStyleRule as ESLintUtils.RuleModule<string, []>,
    'component-name-case': componentNameCaseRule as ESLintUtils.RuleModule<string, []>,
    'component-inner-arrow-function': componentInnerArrowFunctionRule as ESLintUtils.RuleModule<string, []>,
    'arrow-function-comment': arrowFunctionCommentRule as ESLintUtils.RuleModule<string, []>,
    'no-console-log': noConsoleLogRule as ESLintUtils.RuleModule<string, []>,
  },
  configs: {
    recommended: {
      extends: [
        'airbnb',
        'airbnb/hooks',
        'airbnb-typescript'
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json'
      },
      plugins: ['@uni-q/qslint'],
      rules: {
        ...airbnbConfig.rules,
        ...airbnbTsConfig.rules,
        ...airbnbHooksConfig.rules,
        'linebreak-style': 'off',
        '@uni-q/qslint/folder-naming-convention': 'error',
        '@uni-q/qslint/component-export-style': 'error',
        '@uni-q/qslint/component-name-case': 'error',
        '@uni-q/qslint/component-inner-arrow-function': 'error',
        '@uni-q/qslint/arrow-function-comment': 'error',
        '@uni-q/qslint/no-console-log': 'error',
      },
    },
  },
} as const;

export = config;
