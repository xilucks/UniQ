import { TSESLint } from '@typescript-eslint/utils';
import rule from '../arrow-function-comment';

const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
}); 

ruleTester.run('arrow-function-comment', rule, {
  valid: [
    {
      code: `
        // 사용자 클릭 이벤트 핸들러
        const handleClick = () => {
          console.log('clicked');
        };
      `,
    },
    {
      code: `
        const obj = {
          // 데이터를 가져오는 함수
          fetchData: () => {
            return Promise.resolve();
          }
        };
      `,
    },
    {
      code: `
        // 여러 줄 주석도 허용
        /* 이런 형태의 주석도 허용 */
        const process = () => {
          return true;
        };
      `,
    },
  ],
  invalid: [
    {
      code: `
        const handleClick = () => {
          console.log('clicked');
        };
      `,
      errors: [
        {
          messageId: 'missingComment',
          data: { functionName: 'handleClick' },
        },
      ],
    },
    {
      code: `
        const obj = {
          fetchData: () => {
            return Promise.resolve();
          }
        };
      `,
      errors: [
        {
          messageId: 'missingComment',
          data: { functionName: 'fetchData' },
        },
      ],
    },
    {
      code: `
        export const handler = () => {
          return true;
        };
      `,
      errors: [
        {
          messageId: 'missingComment',
          data: { functionName: 'handler' },
        },
      ],
    },
  ],
}); 