import { ESLintUtils } from '@typescript-eslint/utils';
import path from 'path';

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://github.com/xilucks/UniQ/blob/main/packages/common/qslint/readme.md`
);

const isValidNextFolderName = (str: string) => {
  // 기본 케밥 케이스
  const kebabCase = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;
  
  // Next.js 특수 폴더 패턴들
  const dynamicRoute = /^\[.*\]$/;  // [id], [slug] 등
  const catchAllRoute = /^\[\.{3}.*\]$/;  // [...slug] 등
  const optionalCatchAllRoute = /^\[\[\.{3}.*\]\]$/;  // [[...slug]] 등
  const grouping = /^\(.+\)$/;  // (marketing), (shop) 등
  const privateFolder = /^_[a-z0-9-]+$/;  // _components, _utils 등
  const parallelRoute = /^@[a-z0-9-]+$/;  // @modal, @auth 등
  
  return (
    kebabCase.test(str) ||
    dynamicRoute.test(str) ||
    catchAllRoute.test(str) ||
    optionalCatchAllRoute.test(str) ||
    grouping.test(str) ||
    privateFolder.test(str) ||
    parallelRoute.test(str)
  );
};

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
        const filename = context.filename;
        const parentDir = path.basename(path.dirname(filename));
        
        if (parentDir && !isValidNextFolderName(parentDir)) {
          context.report({
            node,
            messageId: 'invalidFolderName',
            data: {
              folderName: parentDir,
            },
          });
        }
      },
    };
  },
}); 