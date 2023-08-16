---
title: 'FormData 값 console.log로 출력하기'
metaTitle: 'FormData 값 console.log로 출력하기'
description: 'FormData 값 console.log로 출력하는 방법'
socialImage: 20230216_01/20230216_01_01.png
date: '2023-02-16'
timestamp: 202302160000
tags:
  - FormData
---

## console.log(FormData)
사용자가 등록한 사진, 동영상 파일을 FormData에 담아 서버로 전달하는 기능을 개발할 때 였다.
FormData에 데이터가 잘 담겼는지 확인하기 위해 FormData 객체를 console.log로 출력했다. 
하지만 빈 객체만 출력될 뿐, FormData에 담은 값은 출력되지 않았다.

```typescript
const formData = new FormData();
formData.append('image', '...');


console.log(formData); // FormData {}
```
FormData는 막연히 서버로 사진과 동영상을 전달할 때 사용하는 객체라고만 생각하고 깊게 알지 못해 발생한 문제였다.


## FormData
FormData는 key/value의 형태로 XMLHttpRequest나 fetch 메소드를 통해 서버로 전달하기 위한 [특수한 객체](https://developer.mozilla.org/en-US/docs/Web/API/FormData)이다. 즉, FormData는 문자화할 수 없어서 console.log()로 출력할 수 없다.


## 출력하는 방법
FormData는 Iterable 이므로 for...of 로 FormData 안의 데이터를 확인할 수 있다.

![FormData interface](https://pub-85c0bb17a41e4bd2b0f173e53fdcf568.r2.dev/20230216_01_01.png)


### init
```typescript
const formData = new FormData();


formData.append('a', '1');
formData.append('b', '2');
formData.append('c', '3');
```


### entries()
```typescript
// [key, value] 출력
for (const x of formData.entries()) {
  console.log(x);
}


// 혹은
for (const x of formData) {
  console.log(x);
}


// result
// ['a', '1']
// ['b', '2']
// ['c', '3']


// 구조분해를 활용하면 key와 value를 동시에 출력하는 것도 가능하다
for (const [key, value] of formData.entries()) {
  console.log(key, value);
}


// result
// 'a', '1'
// 'b', '2'
// 'c', '3'
```

### keys()
```typescript
for (const key of formData.keys()) {
  console.log(key);
}


// result
// 'a'
// 'b'
// 'c'
```

### values()
```typescript
for (const value of formData.values()) {
  console.log(value);
}


// result
// '1'
// '2'
// '3'
```

---
## 참고자료
FormData
- [https://developer.mozilla.org/en-US/docs/Web/API/FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData)
- [https://github.com/meteor/meteor/issues/8125](https://github.com/meteor/meteor/issues/8125)