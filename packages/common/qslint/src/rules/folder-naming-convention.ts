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
        const filePath = context.filename;
        const projectRoot = context.cwd;
        const relativePath = path.relative(projectRoot, filePath);
        
        // 프로젝트 루트 외부 파일은 무시
        if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
          return;
        }

        // 현일의 직계 부모 폴더명 가져오기
        const pathParts = relativePath.split(path.sep);
        const currentFolder = pathParts[pathParts.length - 2];  // 파일명 바로 앞의 폴더

        // 부모 폴더가 없는 경우 무시
        if (!currentFolder) {
          return;
        }

        // 유효하지 않은 이름인 경우에만 에러 보고
        if (!isValidNextFolderName(currentFolder)) {
          context.report({
            node,
            messageId: 'invalidFolderName',
            data: {
              folderName: currentFolder,
            },
          });
        }
      },
    };
  },
}); 