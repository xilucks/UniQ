import rule from '../component-export-style';
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

ruleTester.run('component-export-style', rule, {
  valid: [
    {
      code: `
        export default function MyComponent() {
          return <div>Hello</div>;
        }
      `,
      filename: 'MyComponent.tsx',
    },
  ],
  invalid: [
    {
      code: `
        const MyComponent = () => {
          return <div>Hello</div>;
        };
        
        export default MyComponent;
      `,
      filename: 'MyComponent.tsx',
      errors: [{ messageId: 'invalidExport' }],
    },
    {
      code: `
        export const MyComponent = () => {
          return <div>Hello</div>;
        };
      `,
      filename: 'MyComponent.tsx',
      errors: [{ messageId: 'invalidExport' }],
    },
  ],
}); 