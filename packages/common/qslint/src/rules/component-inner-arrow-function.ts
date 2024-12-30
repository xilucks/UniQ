import { ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://github.com/xilucks/UniQ/blob/main/packages/common/qslint/readme.md`
);

export default createRule({
  name: 'component-inner-arrow-function',
  meta: {
    type: 'problem',
    docs: {
      description: '컴포넌트 내부 함수는 화살표 함수로 선언되어야 합니다.',
    },
    schema: [],
    messages: {
      invalidInnerFunction: '컴포넌트 내부 함수는 화살표 함수로 선언되어야 합니다.',
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      FunctionDeclaration(node) {
        const filename = context.getFilename();
        if (!filename.endsWith('.tsx')) return;

        // export default function 선언이 아닌 경우에만 검사
        if (!node.parent || node.parent.type !== 'ExportDefaultDeclaration') {
          context.report({
            node,
            messageId: 'invalidInnerFunction',
          });
        }
      },
    };
  },
}); 