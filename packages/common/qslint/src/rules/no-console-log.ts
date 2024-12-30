import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://github.com/xilucks/UniQ/blob/main/packages/common/qslint/readme.md`
);

export default createRule({
  name: 'no-console-log',
  meta: {
    type: 'problem',
    docs: {
      description: 'console.log 사용을 금지합니다.',
    },
    schema: [],
    messages: {
      noConsoleLog: 'console.log는 사용할 수 없습니다. 빌드 전에 모든 console.log를 제거해주세요.',
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      MemberExpression(node) {
        if (
          node.object.type === 'Identifier' &&
          node.object.name === 'console' &&
          node.property.type === 'Identifier' &&
          node.property.name === 'log'
        ) {
          context.report({
            node,
            messageId: 'noConsoleLog',
          });
        }
      },
    };
  },
}); 