---
title: 'Modal 개선 (2): esc와 focus trap으로 UX 개선하기'
metaTitle: 'esc와 focus trap으로 UX 개선하기'
description: 'esc와 focus trap을 통한 키보드 접근성 향상'
socialImage: '20240724_01/20240724_01_01.webp'
date: '2024-10-15'
timestamp: 202410140000
tags:
  - react
  - modal
---

Modal UX를 향상시키기 위해 esc로 Modal을 닫는 기능과, focus trap을 적용해서 tab키로 요소를 선택할 때,
Modal 외부 요소로 focus가 옮겨가는 것을 방지하는 기능을 추가했다.

## esc로 Modal 닫기
keydown 이벤트가 발생하면 그 이벤트가 esc키 입력인지 체크하고, 맞다면 Modal을 닫으면 된다.

```tsx
// keydown 이벤트 발생시 실행할 함수
const handleKeyDown = (event: WindowEventMap['keydown']) => {
  // event의 key가 'esc'라면
  if (event.key === 'Escape') {
    // modal을 닫는다.
    closeModal();
  }
}


useEffect(() => {
  // keydown 이벤트가 발생하면 handleKeyDown 함수를 실행
  window.addEventListener('keydown', handleKeyDown);


  return () => {
    // 컴포넌트 언마운트시 keydown event 제거
    window.removeEventListener('keydown', handleKeyDown);
  }
}, []);
```

## focus trap
구현은 다음 순서로 진행했다.

1. Modal 컴포넌트 안에서 focus 할 요소 선언
2. useRef 선언 후 Modal과 ref 연결
3. tab keydown 이벤트 발생시 실행될 함수 선언
- focus 할 요소 탐색
- 탐색한 요소 중 첫 번째 요소와 마지막 요소 찾기
- 마지막 요소에 focus 됐을 때, 다시 첫 번째 요소로 focus 이동
- 반대로, shift + tab으로 첫 번째 요소에 focus 됐을 때, 마지막 요소로 focus
4. tabIndex 설정

```tsx
// querySelector로 찾을 요소
const FOCUSABLE_ELEMENT_TAGS =
	'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex]';


const Modal = () => {
  const modalRef = useRef<HTMLDivElement | null>(null);


  const handleTabKey = (event: WindowEventMap['keydown']) => {
    // modal 컴포넌트 안에 focus할 요소 탐색
    const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENT_TAGS);


    if (!focusableElements) return;


    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];


    // focus된 요소가 현재 마지막 요소이고 tab 키로 요소를 선택한 경우
    // 첫 번째 요소 focus
    if (document.activeElement === lastElement && !event.shiftKey) {
      firstElement.focus();
      event.preventDefault();
      // focus된 요소가 첫 번째 요소이고 shift + tab으로 요소를 선택한 경우
      // 마지막 요소 focus
    } else if (document.activeElement === firstElement && event.shiftKey) {
      lastElement.focus();
      event.preventDefault();
    }
  }


  const handleKeyDown = (event: WindowEventMap['keydown']) => {
    // event의 key가 'tab'이라면
    if (event.key === 'Tab') {
      handleTabKey(event);
    } else if (event.key === 'Escape') {
      closeModal();
    }
  };


  useEffect(() => {
    // keydown 이벤트가 발생하면 handleKeyDown 함수를 실행
    window.addEventListener('keydown', handleKeyDown);

    return () => {
    // 컴포넌트 언마운트시 keydown event 제거
    window.removeEventListener('keydown', handleKeyDown);
    }
  }, []);


  return ReactDOM.createPortal(
    // modal background
    <div className="bg-modalBg z-wrapper fixed left-0 top-0 h-screen w-screen">
      {/* modal */}
      {openedModalList.map((modal) => (
        <div
          key={modal.id}
          {/* focus 시작점을 Modal로 설정하기 위해 tabIndex를 0으로 설정 */}
          tabIndex={0}
          ref={(el) => (modalRef.current = el)}>
            {modal.component}
        </div>
      ))}
    </div>,
    document.body,
  );
}
```
위 코드에서 callback ref를 사용했는데, 중첩이 가능한 Modal 구조이기 때문에 새로운 Modal이 렌더링될 때 마다 그 Modal을 ref에 연결하기 위해서(focus할 수 있는 영역으로 설정하기 위해서) 사용했다.

## 참고자료 및 출처
[callback ref](https://tkdodo.eu/blog/avoiding-use-effect-with-callback-refs)  
[tabIndex](https://naradesign.github.io/tabindex.html)  
[썸네일 아이콘 - flaticon.com](https://flaticon.com)