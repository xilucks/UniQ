import { ESLintUtils } from '@typescript-eslint/utils';
import path from 'path';

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://your-documentation-url.com/rules/${name}`
);

const isKebabCase = (str: string) => /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(str);

export default createRule({
  name: 'folder-naming-convention',
  meta: {
    type: 'problem',
    docs: {
      description: '폴더 이름은 케밥 케이스여야 합니다',
    },
    schema: [],
    messages: {
      invalidFolderName: '폴더 이름 "{{folderName}}"은(는) 케밥 케이스가 아닙니다. 예: "my-folder"',
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      Program(node) {
        const filename = context.getFilename();
        const directories = path
          .dirname(filename)
          .split(path.sep)
          .filter(Boolean);

        directories.forEach((dir) => {
          if (!isKebabCase(dir)) {
            context.report({
              node,
              messageId: 'invalidFolderName',
              data: {
                folderName: dir,
              },
            });
          }
        });
      },
    };
  },
}); 