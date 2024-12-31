# @uni-q/eslint-plugin-qslint

UniQ의 코드 품질 관리를 위한 ESLint 플러그인입니다.

## 설치 방법

```bash
npm install --save-dev @uni-q/eslint-plugin-qslint
```

## 설정 방법

`.eslintrc.json` 파일에 다음과 같이 설정하세요:

```json
{
  "extends": ["plugin:@uni-q/qslint/recommended"],
  "plugins": ["@uni-q/qslint"]
}
```

## 규칙 (Rules)

### 1. folder-naming-convention
폴더 이름은 kebab-case를 따르거나 Next.js 컨벤션을 따라야 합니다.

```bash
# ✅ 올바른 예시
my-folder/          # 기본 kebab-case
[id]/               # 동적 라우트
[...slug]/          # Catch-all 라우트
[[...optional]]/    # Optional catch-all 라우트
(marketing)/        # Route group
_components/        # Private 폴더
@modal/             # Parallel 라우트

# ❌ 잘못된 예시
myFolder/           # camelCase는 사용할 수 없습니다
MyFolder/           # PascalCase는 사용할 수 없습니다
my_folder/          # snake_case는 사용할 수 없습니다
```

### 2. component-export-style
React 컴포넌트는 `export default function` 형태로 선언해야 합니다.

```tsx
// ❌ 잘못된 예시
export default const MyComponent = () => {
  return <div>Hello</div>;
}

// ✅ 올바른 예시
export default function MyComponent() {
  return <div>Hello</div>;
}
```

### 3. component-name-case
컴포넌트 이름은 PascalCase를 사용해야 합니다.

```tsx
// ❌ 잘못된 예시
export default function myComponent() {
  return <div>Hello</div>;
}

// ✅ 올바른 예시
export default function MyComponent() {
  return <div>Hello</div>;
}
```

### 4. component-inner-arrow-function
컴포넌트 내부 함수는 화살표 함수로 선언해야 합니다.

```tsx
// ❌ 잘못된 예시
export default function MyComponent() {
  function handleClick() {
    console.log('clicked');
  }
  return <button onClick={handleClick}>Click me</button>;
}

// ✅ 올바른 예시
export default function MyComponent() {
  const handleClick = () => {
    console.log('clicked');
  };
  return <button onClick={handleClick}>Click me</button>;
}
```

### 5. arrow-function-comment
화살표 함수에는 JSDoc 형식의 주석이 필요합니다.

```tsx
// ❌ 잘못된 예시
const handleClick = () => {
  console.log('clicked');
};

// ✅ 올바른 예시
/**
 * 버튼 클릭 이벤트 핸들러
 * @returns {void}
 */
const handleClick = () => {
  console.log('clicked');
};
```

### 6. no-console-log
`console.log()`는 사용할 수 없습니다. 대신 `console.error()`, `console.warn()` 등을 사용하세요.

```tsx
// ❌ 잘못된 예시
console.log('디버깅 메시지');

// ✅ 올바른 예시
console.error('에러 메시지');
console.warn('경고 메시지');
```

## 기여하기

버그를 발견하셨거나 새로운 규칙을 제안하고 싶으시다면 [이슈](https://github.com/xilucks/UniQ/issues)를 생성해주세요.
