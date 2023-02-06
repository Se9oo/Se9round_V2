---
title: 'safari 브라우저 정규표현식 Invalid regular expression 에러 처리'
metaTitle: 'safari 브라우저 정규표현식 Invalid regular expression 에러 처리'
description: 'safari 브라우저에서 발생한 Invalid regular expression 에러 기록'
socialImage: /images/default.png
date: '2023-02-06'
timestamp: 202302060000
tags:
  - regex
  - error
---

## 문제 발생
정규표현식을 이용해 숫자 천 자리마다 콤마를 붙이는 작업중에 `Invalid regular expression` 에러가 발생했다.
chrome에서는 정상작동하고 safari에서만 발생했다.

결론부터 말하자면 safari에서 [`(?<!)` 정규표현식 문법을 지원하지 않기 때문에](https://caniuse.com/js-regexp-lookbehind) 발생한 오류였다.

문제가 됐던 코드는 아래와 같다.
```typescript
// error (x)
const addCommaAtNumber = (target: number) => {

  const formattedNumber = 
  String(target).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  
  return formattedNumber;
};
```
소수점 부분은 콤마를 붙이지 않기 위해 작성한 `/\B(?<!\\.\d*)` 정규표현식에서 에러가 발생하고 있었다.

## 문제 해결
safari에서도 작동하도록 정수 부분과 소수점 부분을 분리해서 정수 부분에만 콤마를 붙이고, 소수점 부분을 뒤에 붙이도록 수정했다.

수정한 코드
```typescript
// correct (o)
const addCommaAtNumber = (target: number): string => {
  const splitedNumber = String(target).split('.');
  
  const formattedNumber =
  splitedNumber[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
  return splitedNumber.length > 1
  ? `${formattedNumber}.${splitedNumber[1]}` 
  : formattedNumber;
}
```

---
## 참고자료
[https://caniuse.com/js-regexp-lookbehind](https://caniuse.com/js-regexp-lookbehind)