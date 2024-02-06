---
title: 'Next.js 테스트 환경 구축하기 with TypeScript'
metaTitle: ''
description: 'Next.js + TypeScript + Jest + React Testing Library 설정'
socialImage: '20231030_01/20231030_01_01.webp'
date: '2023-10-30'
timestamp: 202310300000
tags:
  - nextjs
  - typescript
  - jest
  - test
---

Next.js 기반 사내 프로젝트에 jest + React Testing Library를 도입하면서 조사한 내용을 정리했다.
## Next.js + TypeScript 설치

Creact Next App을 통해 프로젝트를 생성한다. TypeScript를 적용하기 위해 --typescript 명령어를 추가해준다.
```bash
yarn create next-app --typescript

```

## Jest, React Testing Library 설치

테스트 코드 작성에 필요한 Jest, React Testing Library를 설치해준다.
```bash
yarn add -D jest jest-environment-jsdom @testing-library/jest-dom @testing-library/react @testing-library/user-event
```

## ts-jest 설치

>`ts-jest` is a Jest transformer with source map support that lets you use Jest to test projects written in TypeScript.   [(https://kulshekhar.github.io/ts-jest/docs/)](https://kulshekhar.github.io/ts-jest/docs/)

ts-jest는 TypeScript로 작성된 프로젝트를 Jest를 사용해 테스트 할 때, source map을 지원하는 Jest 전처리기이다. [Babel을 이용하는 방법](https://jestjs.io/docs/getting-started#using-babel)도 있다.

```bash
yarn add -D ts-jest @types/jest
```

## Jest

프로젝트 루트에 jest.setup.js, jest.config.js 파일을 각각 생성한다.

### jest.setup.js
```typescript
import '@testing-library/jest-dom';
```

### jest.config.js
[Next.js 12 부터 Jest가 포함](https://nextjs.org/blog/next-12-1#zero-configuration-jest-plugin)되어 설정이 간편하다.

```javascript
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});


const customJestConfig = {
  setupFilesAfterEnv: ['./jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  preset: 'ts-jest',
};


module.exports = createJestConfig(customJestConfig);
```

## Eslint

### eslint plugin 설치
```bash
yarn add -D eslint-plugin-testing-library eslint-plugin-jest-dom
```

### .eslintrc.json
```typescript
"plugins": ["testing-library", "jest-dom"],
"extends": {
  "plugin:testing-library/react",
  "plugin:jest-dom/recommended"
}
```

eslint 설정을 하면 아래와 같이 안티 패턴으로 작성한 테스트 코드를 올바른 패턴으로 추천해준다.

![20231030_01](https://hfjaydlcifnsisqntesa.supabase.co/storage/v1/object/public/se9round-images/20231030_01/20231030_01_02.webp)


## package.json

passWithNoTests는 파일을 찾을 수 없을 때, 테스트를 통과하도록 허용하는 옵션이다.
```typescript
"test": "jest --watch --passWithNoTests"

```


## 참고자료
[https://nextjs.org/docs/pages/building-your-application/optimizing/testing#setting-up-jest-with-the-rust-compiler](https://nextjs.org/docs/pages/building-your-application/optimizing/testing#setting-up-jest-with-the-rust-compiler)  
[https://kulshekhar.github.io/ts-jest/docs/getting-started/installation/#jest-config-file](https://kulshekhar.github.io/ts-jest/docs/getting-started/installation/#jest-config-file)