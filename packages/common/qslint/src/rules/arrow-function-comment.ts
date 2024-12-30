import { ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://your-documentation-url.com/rules/${name}`
);

export default createRule({
  name: 'arrow-function-comment',
  meta: {
    type: 'problem',
    docs: {
      description: '화살표 함수는 반드시 주석이 있어야 합니다.',
    },
    schema: [],
    messages: {
      missingComment: '화살표 함수 {{functionName}}에 주석이 없습니다.',
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      VariableDeclaration(node) {
        node.declarations.forEach((declaration) => {
          if (
            declaration.init &&
            declaration.init.type === 'ArrowFunctionExpression'
          ) {
            const sourceCode = context.getSourceCode();
            const comments = sourceCode.getCommentsBefore(node);
            
            if (comments.length === 0) {
              context.report({
                node: declaration,
                messageId: 'missingComment',
                data: {
                  functionName: declaration.id.type === 'Identifier' 
                    ? declaration.id.name 
                    : '(anonymous)',
                },
              });
            }
          }
        });
      },

      // 객체 내부의 메서드로 정의된 화살표 함수도 체크
      Property(node) {
        if (
          node.value.type === 'ArrowFunctionExpression'
        ) {
          const sourceCode = context.getSourceCode();
          const comments = sourceCode.getCommentsBefore(node);
          
          if (comments.length === 0) {
            context.report({
              node,
              messageId: 'missingComment',
              data: {
                functionName: node.key.type === 'Identifier' 
                  ? node.key.name 
                  : '(anonymous)',
              },
            });
          }
        }
      },
    };
  },
}); 