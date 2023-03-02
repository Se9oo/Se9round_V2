---
title: 'context API로 코드 개선하기'
metaTitle: 'context API로 코드 개선하기'
description: 'context API를 활용한 코드 개선'
socialImage: 20230228_01/20230228_01_01.png
date: '2023-02-28'
timestamp: 202302281700
tags:
  - context api
---

## 기존 코드의 문제점
야근에 치여 급하게 구현해놓은 코드를 개선해봤다. 개발했던 기능은 회원가입시 SMS를 이용한 본인인증이고 간략한 로직은 다음과 같다.

1. 회원 정보 입력 (이름, 생년월일, 통신사, 휴대전화 번호)
2. SMS 발송 API 호출
3. SMS 발송 코드 검증 API 호출 및 회원가입 정보 세팅

기존에 작성한 코드에서는 1, 2, 3 단계에서 사용하는 공통적인 state들을 props를 통해 관리하다보니 전달하는 props가 많아 `컴포넌트간 결합도가 강해지고 코드의 복잡도가 높다`는 문제점이 있었다.

문제점을 해결하기 위해 `context API`를 활용해서 회원 정보를 한 곳에서 관리하는 방식으로 코드를 개선하면 좋을 것 같아서 적용해봤다.

context API에 대한 설명은 [이 블로그](https://velog.io/@velopert/react-context-tutorial)에 정리가 잘 되어있어서 참고를 많이 했다.

## context 작성
### createContext
`createContext`로 context를 생성하고 초기 값을 설정했다. 값이 담긴 context와 값을 설정하는 context로 분리해서 생성했다.
```typescript
// AuthContext.tsx
const AuthContext = createContext<AuthDataType>({
  signParams: { ... }, // 회원가입 정보
  authInfo: { ... }, // 본인인증 정보
  isAuth: false, // 본인인증 정보 입력 form 컴포넌트, sms 발송 코드 컴포넌트 flag
});


const AuthActionContext = createContext<AuthActionType>({
  setSign: (params: SignUserPostParams) => {},
  setAuth: (params: AuthFormType) => {},
  setIsAuth: () => {},
});
```
### Provider
useState로 context에서 사용할 데이터를 선언하고, 객체 형태로 `Provider`의 value에 할당한다.
리렌더링 될 때 마다 데이터를 담은 객체들이 재생성되므로, 이 객체들을 재사용 할 수 있도록 `useMemo`로 메모라이징했다.
```typescript
// AuthContext.tsx
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [signParams, setSignParams] = useState<SignUserPostParams>({
    ...
  });
  const [authInfo, setAuthInfo] = useState<AuthFormType>({
    ...
  });
  const [isAuth, setIsAuth] = useState(false);


  const values = useMemo(() => ({
  	signParams,
  	authInfo,
  	isAuth,
  }), [signParams, authInfo, isAuth]);


  const actions = useMemo(() => ({
    setSign: setSignParams,
    setAuth: setAuthInfo,
    setIsAuth,
  }), []);


  return (
    <AuthContext.Provider value={values}>
      <AuthActionContext.Provider value={actions}>{children}</AuthActionContext.Provider>
    </AuthContext.Provider>
  );
};
```
### useContext
`useContext`로 context의 값을 컴포넌트에서 꺼내 쓸 수 있다. 다만, context에 접근해야하는 컴포넌트마다 useContext를 import 해야하기 때문에, `별도의 custom hook`을 만들어 context에 접근하도록 했다.
```typescript
// AuthContext.tsx
export const useAuthValues = () => {
  const values = useContext(AuthContext);

  if (!values === undefined) {
    throw new Error('useAuthValues should be used within AuthProvider');
  }

  return values;
};


export const useAuthActions = () => {
  const actions = useContext(AuthActionContext);

  if (!actions) {
    throw new Error('useAuthActions should be used within AuthProvider');
  }

  return actions;
};
```
## 개선
기존 코드에서는 하위 컴포넌트에서 상위 컴포넌트의 state를 제어하기 위해서 state와 setState 함수를 props로 전달해야 했고, 이 과정에서 props가 늘거나 props로 전달하는 컴포넌트 계층이 깊어질수록 코드가 복잡해졌다.

개선한 코드에서는 하위 컴포넌트에서 직접 context에 접근해 state를 제어할 수 있어서 state 제어 목적의 props를 제거함으로써 복잡한 코드를 간결하게 나타낼 수 있었다.

![20230228_01](https://hfjaydlcifnsisqntesa.supabase.co/storage/v1/object/public/se9round-images/20230228_01/20230228_01_01.png)


![20230228_02](https://hfjaydlcifnsisqntesa.supabase.co/storage/v1/object/public/se9round-images/20230228_01/20230228_01_02.png)

## 느낀점
context API로 코드를 개선하면서 제일 먼저 든 생각은 애초에 context API에 대해 깊게 알고 있었다면 컴포넌트 설계부터 더 좋은 방향으로 할 수 있었을 것 같은 아쉬움이였다. (평소에 공부하는 습관이 역시 중요하다.)

그래도 이번 기회에 context API에 대해 명확하게 알게되서 좋았고, 앞으로 비슷한 상황에서는 context API를 잘 활용 할 수 있을 것 같다.