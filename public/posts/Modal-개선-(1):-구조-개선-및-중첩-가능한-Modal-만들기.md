---
title: 'Modal 개선 (1): 구조 개선 및 중첩 가능한 Modal 만들기'
metaTitle: '구조 개선 및 중첩 가능한 Modal 만들기'
description: '구조 개선 및 중첩 가능한 Modal 만들기'
socialImage: '20240724_01/20240724_01_01.webp'
date: '2024-07-24'
timestamp: 202407230000
tags:
  - react
  - zustand
  - modal
---

기존에 개발한 Modal 컴포넌트는 몇 가지 문제점이 있어서, Modal 구조를 개선하여 문제점을 해결하면서 몇 가지 기능들도 추가했다.
중첩 가능한 Modal, Esc 키로 Modal 종료, background transition, focus trap 기능을 추가했는데, 각각의 주제로 글을 작성할 예정이다.

이번 글은 Modal의 구조를 개선한 것과, 중첩이 가능한 Modal을 개발한 내용에 대한 글이다.

사용한 기술 스택
- Next.js
- TypeScript
- Zustand

## 기존 Modal 구조의 문제점

### 변경 전 코드
```typescript
// store
import { create } from 'zustand';


// Modal이 추가될 때 마다 type 추가
export type ModalType =
	| 'typeA'
	| 'typeB'
	| 'typeC'
	| 'typeD'
	|...


interface ModalState {  
    isModalOpen: boolean; // Modal 노출 여부
    modalType: ModalType; // Modal의 종류
    actions: {
      setIsModalOpen: () => void; // Modal 노출 여부 변경
      setModalType: (formType: ModalType) => void; // 현재 노출되는 Modal 종류 변경
	  };
}


const useModalStore = create<ModalState>((set) => ({
    ...
}));


export const useIsModalOpen = () => useModalStore((state) => state.isModalOpen);
export const useModalType = () => useModalStore((state) => state.modalType);
export const useModalActions = () => useModalStore((state) => state.actions);
```
```tsx
// Modal.tsx
const Modal = ({ activeModalTypes, modalContent }: { activeModalTypes: ModalType[]; modalContent: ReactNode }) => {
  const isModalOpen = useIsModalOpen();


  if (!activeModalTypes.includes(modalType)) return null;


  return (
    <Portal elementSelector="#modal">
      <div
        className={`${isModalOpen ? 'block' : 'hidden'} bg-modalBg z-wrapper fixed  left-0 top-0 h-screen w-screen`}
      >
        {modalContent}
			</div>
		</Portal>
  );
};


export default Modal;

```
```tsx
// page.tsx
const SamplePage = () => {
  const modalType = useModalType();


  return (
    <>
      ...
      <Modal activeModalTypes={['typeA', 'typeB']} modalContent={<Sample />} />
    </>
  );
};


export default SamplePage;

```

### 세 가지 문제점

**새로운 Modal이 추가될 때마다 modalType을 추가해야 하고, Modal을 사용하는 곳에서 modalType 값을 알고 있어야 한다.**
  - modalType은 비즈니스 로직(ex 게시글 등록, 수정할 때 로직 분기 및 form 조건부 렌더링 등)을 위한 state로, 새로운 Modal이 추가될 때마다 함께 값을 추가해야 하고 Modal을 사용하는 컴포넌트에 modalType 값을 일일이 작성해야 했다.

**Modal을 중첩해서 사용할 수 없다.**
  - Modal의 현재 상태 구조는 다수의 Modal 상태를 관리할 수 있는 구조가 아니다.

**props를 통한 컴포넌트 주입**
  - Modal에서 렌더링할 컴포넌트를 props로 주입받기 때문에, Modal이 사용되는 곳에 항상 Modal을 import 하게 되면서 컴포넌트와 Modal 간의 결합도가 높아졌다.


## 개선

### 불필요한 상태 제거
불필요한 상태(modalType)를 제거해서, Modal과 Modal을 사용하는 컴포넌트들이 modalType 상태에 의존하지 않도록 개선했다.

### Modal 배열 생성
Modal의 정보(Modal id, Modal에 렌더링할 컴포넌트)가 담긴 객체를 배열에 저장해서 다수의 Modal 상태를 관리할 수 있는 구조로 변경했다.

### Modal props 제거
Modal 컴포넌트에서 렌더링할 컴포넌트를 props로 주입 받는 방식에서 Modal이 사용될 곳에서 메소드의 인자 값으로 컴포넌트를 전달하는 방식으로 변경했다. 

### 변경 후 코드
```typescript
// store.ts
interface ModalType {
  id: string;
  component: ReactNode;
}


interface ModalState {
  openedModalList: ModalType[];
  actions: {
    openModal: (modalContentComponent: { modalContentComponent: ReactNode }) => void;
    closeModal: () => void;
    clearOpenedModal: () => void;
  };
}


const useModalStore = create<ModalState>((set) => ({
  openedModalList: [],
  actions: {
		openModal: ({ modalContentComponent }: { modalContentComponent: ReactNode }) =>
			set((state) => ({
				openedModalList: [
          ...state.openedModalList,
          { 
            // Modal 고유 ID 부여
            id: crypto.randomUUID(),
            component: modalContentComponent
          }],
			})),
		closeModal: () =>
			set((state) => {
				const modalList = [...state.openedModalList];


				modalList.pop();


			  return {
					openedModalList: modalList,
				};
			}),
		clearOpenedModal: () =>
			set(() => ({
				openedModalList: [],
			})),
  },
}));


export const useOpenedModalList = () => useModalStore((state) => state.openedModalList);
export const useModalActions = () => useModalStore((state) => state.actions);

```

```tsx
// Modal.tsx
const Modal = () => {
  const openedModalList = useOpenedModalList();
  ...
  if (openedModalList.length === 0) return null;


  return ReactDOM.createPortal(
		<div className="bg-modalBg z-wrapper fixed left-0 top-0 h-screen w-screen">
			{openedModalList.map((modal) => (
				<div key={modal.id}>{modal.component}</div>
			))}
		</div>,
		document.body,
  );
};


export default Modal;
```
```tsx
// _app.tsx
const App = ({ Component, pageProps }: AppProps) => {


  return (
		<>
			<Head>
				...
			</Head>
			<>
				<Component {...pageProps} />
				<Modal />
			</>
		</>
  );
};
```
```tsx
// page.tsx
const SamplePage = () => {
  const { openModal } = useModalActions();


  const handleOpenModal = () => {
    openModal({
      modalContentComponent: <Sample />
    })
  }


  return (
    <>
      ...
      <button type="button" onClick={handleOpenModal} />
    </>
  );
};


export default SamplePage;

```

Modal을 사용하고 싶은 곳에서 openModal 메소드의 인자 값으로 렌더링할 컴포넌트를 담아 호출하면, _app.tsx에 import된 Modal 컴포넌트에서 openModalList 배열의 변화를 감지하고 화면에 Modal을 렌더링한다.

마찬가지로 closeModal 메소드를 호출하면 마지막에 저장된 Modal 컴포넌트부터 배열에서 제거하고, openModalList가 빈 배열이 되면 화면에서 Modal이 제거된다.


## 출처

[썸네일 아이콘 출처 - flaticon.com](https://flaticon.com)