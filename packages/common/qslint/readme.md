## Eslint For Quality System team
this is eslint plugin for quality system team.
Based on convention of quality system team.

## Rules
this rules is based on airbnb style guide.

### no-console-log
no console.log in code. 
example:
```ts
// bad  
console.log('hello');

// good
console.error('hello');
``` 

### component-export-style
react component must be declared as export default function.
example:
```ts
// bad  
export default const MyComponent = () => {
  return <div>Hello</div>;
}

// good
export default function MyComponent() {
  return <div>Hello</div>;
}
```

### folder-naming-convention
folder name must be kebab case.
example:
```ts
// bad  
myFolder

// good
my-folder
```

### component-inner-arrow-function
component inner function must be arrow function.
example:
```ts
// bad  
export default function MyComponent() {
  function myFunction () {
    return 'foo';
  }
}

// good
export default function MyComponent() {
  const myFunction = () => {
    return 'foo';
  }
}
```

### arrow-function-style
function must have comment.
example:
```ts
// bad  
const myFunction = (foo: string) => {
  return foo;
}

// good
/*
* @description myFunction is a function that returns 'foo' 
* @param {string} param - myFunction's parameter
* @returns {string} - myFunction's return value
*/
const myFunction = (foo: string) => {
  return foo;
}
*/
```


## how to use

```bash
npm install @uni-q/eslint-plugin-qslint
```

```bash
eslint --ext .ts,.tsx --plugin @uniq/qslint --rules @uniq/qslint/rules/no-console-log.ts
```     

## 설정 방법

`.eslintrc.json` 파일에 다음과 같이 설정하세요:

```json
{
  "extends": ["plugin:@uni-q/qslint/recommended"],
  "plugins": ["@uni-q/qslint"]
}
```    
