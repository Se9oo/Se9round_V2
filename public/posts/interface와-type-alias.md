---
title: 'interface와 type alias'
metaTitle: ''
description: '타입스크립트에서 interface와 type alias의 차이점 알아보기'
socialImage: '20230824_01/20230824_01_01.webp'
date: '2023-08-24'
timestamp: 202308240000
tags:
  - typescript
  - interface
  - type
---

## Intro
타입스크립트에서 interface와 type alias는 타입에 이름을 부여한다는 공통적인 동작 때문에 혼용되어 사용되기 쉽다.
이를 방지하기 위해서는 interface와 type alias의 차이점을 정확히 알 필요가 있다.

## 차이점
### 선언 가능한 타입
interface는 **객체 타입**만 선언 가능하다. 하지만 type alias은 **원시 타입(number, string, boolean ...)과 객체 타입** 모두 선언 가능하다.

```typescript
// 가능 (O)
type StringType = string;

// 불가 (X)
interface StringInterface = string;
```

### 맵드 타입(mapped type)
맵드 타입은 기존에 정의된 타입을 새로운 타입으로 변환해주는 문법이다.
interface는 사용 불가하고 type alias만 사용 가능하다.

```typescript
type CountryList = 'korea' | 'switzerland' | 'england';

type CountryCodeInfo = {
    [key in CountryList]: number;
};

const countryCodes: CountryCodeInfo = {
    korea: 1,
    switzerland: 2,
    england: 3,
};
```

### 타입 확장 방법
interface는 extends 키워드를, type alias는 &(interaction)을 통해 타입을 확장할 수 있다.

```typescript
// interface
interface Person {
   name: string;
   age: number;
};

interface Developer extends Person {
   position: 'frontend'
};

// type
type Person2 = {
   name: string;
   age: number;
};

type Developer2 = Person & {
   position: 'frontend'
};
```

### 선언 병합(declaration merging)
type alias는 새로운 속성을 추가하기 위해 type alias을 직접 수정하거나 & 키워드를 사용해야 하지만, interface는 **동일한 이름으로 재선언**해서 새로운 속성을 추가할 수 있다.

```typescript
interface Person {
   name: string;
   age: number;
};

interface Person {
   height: number;
};

// 위에 코드는 결과적으로 아래와 같다.
interface Person {
   name: string;
   age: number;
   height: number;
};

const chulsoo: Person = {
   name: '철수',
   age: 20,
   height: 180,
};
```

type alias는 선언 병합이 불가능하다.

```typescript
// error - Duplicate identifier 'Person'
type Person = {
   name: string;
   age: number;
};

// error - Duplicate identifier 'Person'
type Person = {
   height: number;
};
```

처음 선언 병합을 접했을 때는, 선언한 interface의 이름이 중복되기 때문에 지양해야 할 것 같았는데, typescript에서 ES Module을 추가할 때 선언 병합 방식으로 구현한다고 한다.

예를 들면, Array의 기본적인 interface는 **lib.es5.d.ts**에 선언되어 있는데, tsconfig.json lib 설정을 통해 ES2015 모듈을 추가하면 **typescript는 lib.es2015.d.ts에 선언된 Array interface를 병합**한다. 그러면 ES2015에 추가된 find 같은 새로 추가된 메서드를 사용할 수 있게 된다.

## 정리
- interface는 선언 병합이 가능해서 타입 확장이 용이하므로 API의 response 같이 변경될 가능성이 큰 타입을 정의할 때 사용하는 것이 좋다.
- type alias는 맵드 타입처럼 복잡한 타입을 구현할 때, 변경가능성이 적은 타입을 정의할 때 사용하는 것이 좋다.

## 참고자료
[타입스크립트 type과 interface의 공통점과 차이점](https://yceffort.kr/2021/03/typescript-interface-vs-type)  
[맵드 타입(Mapped Type)이란?](https://joshua1988.github.io/ts/usage/mapped-type.html#%EB%A7%B5%EB%93%9C-%ED%83%80%EC%9E%85-mapped-type-%EC%9D%B4%EB%9E%80)  
이펙티브 타입스크립트 - 아이템13 타입과 인터페이스의 차이점 알기 (저자 댄 밴더캄)