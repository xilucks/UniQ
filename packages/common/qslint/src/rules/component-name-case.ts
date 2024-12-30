import { ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://your-documentation-url.com/rules/${name}`
);

const isPascalCase = (str: string) => /^[A-Z][a-zA-Z0-9]*$/.test(str);

export default createRule({
  name: 'component-name-case',
  meta: {
    type: 'problem',
    docs: {
      description: 'React 컴포넌트 이름은 파스칼케이스여야 합니다.',
    },
    schema: [],
    messages: {
      invalidName: '컴포넌트 이름은 파스칼케이스여야 합니다. (예: MyComponent)',
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      ExportDefaultDeclaration(node) {
        const filename = context.getFilename();
        if (!filename.endsWith('.tsx')) return;

        if (
          node.declaration.type === 'FunctionDeclaration' &&
          node.declaration.id &&
          !isPascalCase(node.declaration.id.name)
        ) {
          context.report({
            node: node.declaration,
            messageId: 'invalidName',
          });
        }
      },
    };
  },
}); 