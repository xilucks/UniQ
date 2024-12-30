import rule from '../component-name-case';
import { TSESLint } from '@typescript-eslint/utils';

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

ruleTester.run('component-name-case', rule, {
  valid: [
    {
      code: `
        export default function MyComponent() {
          return <div>Hello</div>;
        }
      `,
      filename: 'MyComponent.tsx',
    },
    {
      code: `
        export default function UserProfile() {
          return <div>Profile</div>;
        }
      `,
      filename: 'UserProfile.tsx',
    },
  ],
  invalid: [
    {
      code: `
        export default function myComponent() {
          return <div>Hello</div>;
        }
      `,
      filename: 'myComponent.tsx',
      errors: [{ messageId: 'invalidName' }],
    },
    {
      code: `
        export default function userProfile() {
          return <div>Profile</div>;
        }
      `,
      filename: 'userProfile.tsx',
      errors: [{ messageId: 'invalidName' }],
    },
  ],
}); 