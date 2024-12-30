import rule from '../component-inner-arrow-function';
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


ruleTester.run('component-inner-arrow-function', rule, {
  valid: [
    {
      code: `
        export default function MyComponent() {
          const handleClick = () => {
            console.log('clicked');
          };
          
          return <button onClick={handleClick}>Click me</button>;
        }
      `,
      filename: 'MyComponent.tsx',
    },
  ],
  invalid: [
    {
      code: `
        export default function MyComponent() {
          function handleClick() {
            console.log('clicked');
          }
          
          return <button onClick={handleClick}>Click me</button>;
        }
      `,
      filename: 'MyComponent.tsx',
      errors: [{ messageId: 'invalidInnerFunction' }],
    },
  ],
}); 