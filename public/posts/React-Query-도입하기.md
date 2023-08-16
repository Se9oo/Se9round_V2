---
title: 'React Query 도입하기'
metaTitle: 'React Query 도입하기'
description: 'React Query 도입으로 코드 개선 해보기'
socialImage: '20230518_01/20230518_01_01.webp'
date: '2023-05-18'
timestamp: 202305180000
tags:
  - react-query
---

## React Query를 도입하게 된 계기
입사 후 처음 맡게된 업무는 jsp + jquery로 만들어진 사내 admin 프로젝트를 react로 재구축하는 일이였다.
그래서 기존에 있던 API를 요청하는 코드 작성을 주로 하게 됐는데, 작성할 때 마다 느껴지는 몇 가지 불편한 점이 있었다.

### 불편했던 점
첫 번째로는 **작성해야할 코드가 많고, 구조가 복잡했다.**  
하나의 API를 요청하려면 API 요청 함수, service 함수(로직 처리 함수), 요청 성공/실패시 동작 함수, axios 코드를 필수로 작성해야 했다.  

또한 각각의 다른 파일에 분리해서 작성했기 때문에, 하나의 API 요청에 3개의 파일을 필수적으로 작성해야했다. 여러 파일을 옮겨다니면서 코드를 작성하는 과정에서 실수가 발생할 확률이 높았고, 에러 디버깅에도 어려움이 있었다.
  
그리고 service 함수(로직 처리 함수)는 API 성공/실패시에 실행 될 callback 함수를 항상 parameter로 받아야했다.
```javascript
// component
// API 요청 성공시 실행 코드
const successGetList = (data) => {
  ...
}
// API 요청 실패시 실행 코드
const errorGetList = (error) => {
  ...
}
// 리스트 조회 API 요청
const getList = async () => {
  await ListApiService.getList({
    params,
    successCallback: successCallbackGetList,
    errorCallback: errorCallbackGetList,
  });
}
```
```javascript
// service
// 로직 처리 함수
async getList({ params, successCallback, errorCallback}) {
  try {
    const response = await ListApi.getList({ params });
    // 성공
    ...
    successCallback(data);
    // 실패
    ...
    errorCallback();
  } catch (error) {
    errorCallback();
  }
}
```
```javascript
// API
//API 요청 axios 코드
const ListApi = {
  getList: async ({ params }) {
    return await axios.get(...);
  }
}
```

두 번째로는 **서버에서 받아온 데이터를 client state로 관리해야하는 점**이다.  
리스트를 화면에 그리기 위해서 필수적으로 useState를 선언하고, 그 안에 서버로부터 받은 데이터를 담아 사용해야 했다.
컴포넌트 안에서는 컴포넌트가 제어할 수 있는 state만 관리하고 싶었다.
```javascript
const [list, setList] = useState([]);


// API 성공시 받아온 데이터 set
const successGetList = (data) => {
  setList(data)
};
```

이런 불편함을 느끼던 중, React Query를 도입해 비슷한 문제들을 개선한 글들을 보았고, 불편함을 해소할 수 있을 것 같아서
React Query를 도입해보기로 했다.  

## React Query 도입으로 얻은 것
### 코드 경량화 및 구조 간소화
아래 코드는 위에 작성한 예시 코드와 동일한 동작을 하는 React Query 코드이다.
```javascript
const { data: listData } = useQuery(['getList'], () => ListApi.getList(), {
  onSuccess: () => {
    // API 요청 성공시 실행 코드
    ...
  },
  onError: () => {
    // API 요청 실패시 실행 코드
    ...
  }
});
```
기존 service 함수에서 처리했던 로직을 **useQuery** 안에서 처리하게 되면서, 더 이상 service 함수를 별도 파일에 작성하지 않게 됐다.

또한 useQuery 함수 내부에서 API 요청 성공/실패 로직을 작성하므로써, 직관적인 코드 작성을 할 수 있었고, 디버깅이 간편해졌다.

### client state와 server state의 분리
```tsx
const List = () => {
  const { data: listData } = useQuery(...);


  return (
    <>
      <span>{listData.name}</span>
      <span>{listData.age}</span>
    </>
  )
};
```
기존에는 컴포넌트에서 useState로 서버 데이터를 client state처럼 사용하는 형태였는데, 위에 예시 코드처럼 서버 데이터를 React Query로 제어하게 되면서, 컴포넌트에서는 관리가 필요한 state에만 집중할 수 있었다.

### 캐싱
캐싱은 React Query에서 지원하는 강력한 기능이라 프로젝트에 적용해 보았다.

React Query는 **staleTime**, **cacheTime**을 설정해 API 요청으로 받아온 데이터를 캐싱할 수 있다.  
**staleTime**은 받아온 데이터가 유효하다고 판단하는 시간을 의미하고, **cacheTime**은 그 데이터가 메모리에 존재하는 시간을 의미한다.

프로젝트에 적용할 땐 데이터 변경이 자주 일어나지 않는 API에 캐싱 처리를 해서, API 호출 횟수를 줄일 수 있었다.  
  
ex)  
일반 사용자가 예약한 데이터 조회 리스트 -> 데이터 변경이 자주 발생하기 때문에 캐싱 적용 X  
운영자가 직접 조작하는 데이터 조회 리스트 -> 운영자가 데이터 조작을 할 때만 데이터 변경이 발생하므로 캐싱 적용 O
```javascript
// staleTime을 5분으로 설정해서 
// 동일한 쿼리가 5분 안에 재실행되면 별도 API 호출 없이 캐싱된 데이터를 사용한다.
const { data } = usQuery(..., {
  onSuccess: () => { ... },
  onError: () => { ... },
  staleTime: 5 * 60 * 1000, // 5분,
});
```

## 참고자료
아래는 React Query를 도입하면서 참고했던 글들이다. 정말 많은 도움을 받았고 내용도 좋기 때문에, 도입을 고민하고 있다면 꼭 읽어봤으면 좋겠다.  

[My구독의 React Query 전환기](https://tech.kakao.com/2022/06/13/react-query/)  
[카카오페이 프론트엔드 개발자들이 React Query를 선택한 이유](https://tech.kakaopay.com/post/react-query-1/)  
[Store에서 비동기 통신 분리하기 (feat. React Query)](https://techblog.woowahan.com/6339/?fbclid=IwAR3ZjgJwNjMuR9i8TNkVavxPSTzk8bnXoH57JJd81hIzQsYNbABJUkCiyHc)