import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://github.com/xilucks/UniQ/blob/main/packages/common/qslint/readme.md`
);

export default createRule({
  name: 'component-export-style',
  meta: {
    type: 'problem',
    docs: {
      description: 'React 컴포넌트는 export default function으로 선언되어야 합니다.',
    },
    schema: [],
    messages: {
      invalidExport: '컴포넌트는 반드시 export default function으로 선언되어야 합니다.',
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      Program(node) {
        const filename = context.getFilename();
        if (!filename.endsWith('.tsx')) return;

        let hasValidExport = false;

        context.sourceCode.ast.body.forEach((node) => {
          if (
            node.type === 'ExportDefaultDeclaration' &&
            node.declaration.type === 'FunctionDeclaration'
          ) {
            hasValidExport = true;
          }
        });

        if (!hasValidExport) {
          context.report({
            node,
            messageId: 'invalidExport',
          });
        }
      },
    };
  },
}); 