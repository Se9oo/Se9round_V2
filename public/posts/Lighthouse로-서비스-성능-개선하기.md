---
title: 'Lighthouse로 서비스 성능 개선하기'
metaTitle: 'Lighthouse로 서비스 성능 개선하기'
description: 'Lighthouse로 서비스 성능 개선하기'
socialImage: 20230327_01_01.webp
date: '2023-03-27'
timestamp: 202303271000
tags:
  - lighthouse
  - nextjs
---

## 계기
사내 서비스 중, 무엇을 개선하면 사용자 경험을 향상 시킬 수 있을 지 고민하다가 **Lighthouse**로 서비스 메인 페이지 성능을 개선하면 좋을 것 같아서 시도해봤다.

![20230327_02](https://pub-85c0bb17a41e4bd2b0f173e53fdcf568.r2.dev/20230327_01_02.webp)

![20230327_03](https://pub-85c0bb17a41e4bd2b0f173e53fdcf568.r2.dev/20230327_01_03.webp)

## image 최적화
### Image elements do not have explicit width and height
이미지 요소에 명확한 width와 height 값을 설정하라는 뜻인데, [**CLS(Cumulative Layout Shift)**](https://web.dev/i18n/ko/optimize-cls/)와 관련이 있다.

`CLS(Cumulative Layout Shift)`는 웹 페이지에서 어떤 요소가 갑자기 페이지에 추가되거나 크기가 조정되면서 레이아웃이 강제로 이동하는 현상이다.

기존 메인 페이지에서는 이미지의 width, height 값을 CSS로만 설정했는데, img 태그의 속성으로 명확하게 설정하지 않았기 때문에 이미지 로드가 완료되면 다른 요소를 밀어내면서 레이아웃 이동 현상이 발생했다.

img 태그에 기본적인 width, height 값을 설정하면 이미지 요소가 들어갈 공간 설정한 속성 값으로 미리 잡아두기 때문에 다른 요소를 밀어내지 않아 레이아웃 이동 현상이 발생하지 않는다.
```html
<img src="..." alt="..." width="640" height="360">
```

### Serve images in next-gen formats
webp, AVIF 같은 새로운 이미지 파일 형식을 사용하라는 의미이다. jpg/png 보다 압축률이 좋아서, 이미지 용량을 크게 줄일 수 있다.

서비스에서 사용하는 이미지들은 모두 jpg/png 형식이였고, 이미지들의 기본 용량이 모두 MB단위였다. 심지어 가장 처음에 로드되는 배경 이미지의 용량은 10MB였다.

그래서 [**squoosh.app**](https://squoosh.app/) 사이트를 이용해 파일 포맷을 jpg, png보다 압축률이 좋은 [**webp**](https://developers.google.com/speed/webp?hl=ko)로 변환하면서 용량을 줄였다. (10MB 이미지를 292KB로 줄일 수 있었다.)

## font 최적화
### Ensure text remains visible during webfont load
웹 폰트가 로드될 때도 텍스트가 보이도록 하라는 의미이다.

폰트는 브라우저가 화면을 렌더링할 때, CSSOM과 DOM트리를 합쳐 렌더링 트리를 구성하는 단계에서 리소스 요청을 하는데, 컨텐츠가 화면에 그려질 때 폰트가 다운로드되지 않은 상태라면, 폰트가 적용될 텍스트의 렌더링을 차단한다.

렌더링 차단 처리 방식에는 **FOIT**, **FOUT**이 있다.  
(Internet Explorer 계열 브라우저에서는 FOUT 방식, 그 외 브라우저는 FOIT 방식으로 동작한다.)

![20230327_04](https://pub-85c0bb17a41e4bd2b0f173e53fdcf568.r2.dev/20230327_01_04.gif)

**FOIT** 방식은 텍스트가 화면에 표시되지 않다가 폰트가 다운로드되면 화면에 나타나기 때문에, 위에서 언급한 **CLS** 점수에 좋지 않은 영향을 끼친다.

**font-display** 속성을 **swap**으로 지정해서 **FOUT** 방식으로 동작하게끔 설정하면 CLS  점수에 영향이 가지 않는다.

## 공통
### Serve static assets with an efficient cache policy
변할 가능성이 없어서 매 번 서버로부터 불러올 필요가 없는 정적 컨텐츠(주로 이미지와 폰트를 의미한다)를 캐싱하라는 의미이다.

서비스에서 제공하는 이미지와 폰트 모두 AWS S3 버킷에 저장되어 있어서, AWS에서 각 이미지에 캐시 관련 메타 데이터(cache-control)를 설정했다.

![20230327_04](https://pub-85c0bb17a41e4bd2b0f173e53fdcf568.r2.dev/20230327_01_04.webp)

개발자 도구 > network 탭에서, 캐싱된 컨텐츠들을 사용하는 것을 확인할 수 있다.

### Avoid enormous network payloads
네트워크 요청을 줄이라는 의미이다. 개선하기 전에는 약 40MB의 리소스를 서버로 요청했었다.
캐싱을 적용해도 최초에는 컨텐츠들을 서버로부터 내려받아야하기 때문에, 컨텐츠들(이미지, 폰트 등)의 기본적인 용량을 줄이면 도움이 된다.

#### image
파일 형식을 jpg, png에서 webp로 변환하는 과정에서 용량을 압축하는 것으로 개선할 수 있었다.

#### font
폰트는 ttf, otf 형식을 woff, woff2로 변환하면서 용량을 줄일 수 있었다. woff는 ttf, otf 보다 압축률이 좋고, woff2는 woff보다 약 30%정도 압축률이 좋다.

[Fontforge](https://fontforge.org/en-US/) tool을 이용해서 폰트 파일 안에 공백이나 지원하지 않아도 될 특수문자 등을 제거해서 조금 더 용량을 줄일 수 있었다.

추가적으로 woff2, woff 형식을 지원하지 않은 브라우저는 ttf, otf 형식의 폰트가 적용되도록 font-face를 작성했다.

```css
@font-face {
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 300;
  src: local('Noto Sans KR Light'),
    url(.../noto-sans-kr-light.woff2) format('woff2'),
    url(.../noto-sans-kr-light.woff) format('woff'),
    url(.../noto-sans-kr-light.otf) format('opentype'),
    url(.../noto-sans-kr-light.ttf) format('truetype');
  font-display: swap;
}
```

### Reduce unused JavaScript
개선을 진행한 서비스는 달력 제어를 위해 **react-datepicker** 라이브러리를 사용하고 있다. 그러나 메인 페이지에서는 해당 라이브러리가 사용되지 않는데도 CDN으로 라이브러리 CSS 파일을 호출하고 있었다.
```html
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/.../react-datepicker.min.css"
/>
```

CDN으로 불러오던 방식을 패키지 안에 존재하는 CSS 파일을 사용하도록 하고, 실제 필요한 페이지에서만 import 하도록 수정했다.
```typescript
import 'react-datepicker/dist/react-datepicker.min.css';
```

## 개선 결과

![20230327_05](https://hfjaydlcifnsisqntesa.supabase.co/storage/v1/object/public/se9round-images/20230327_01/20230327_01_05.webp)

- FCP : 0.5s -> 0.2s
- TTI(Time to Interactive) : 4.5s -> 0.2s
- Speed Index : 1.5s -> 0.9s
- TBT(Total Blocking Time) : 130ms -> 0ms
- LCP(Largest Contentful Paint) : 11.5s -> 1.6s
- CLS(Cumulative Layout Shift) : 0.009 -> 0.004
- network 요청 payloads : 40,162KB -> 3,890KB

페이지가 가벼워진 느낌이 들었고 수치로 봤을 때도 많이 개선되었다.

### 아쉬운 점
서비스를 개선하면서 느낀 몇 가지 아쉬운 점이 있었다.

- 메인 페이지에서 불러오는 폰트 파일이 10개라서 network payload를 줄이는데 한계가 있었다는 점
- 메인 페이지에서 텍스트에 fade in animation 적용되어 있어서 [LCP가 증가할 수 있는 점](https://www.debugbear.com/blog/opacity-animation-poor-lcp)

페이지 기획을 변경하는 것 외에는 개선 방법이 명확하지 않아서 개선 방법에 대해 조금 더 고민해 보기로 했다.

---
## 참고자료
webp  
[https://developers.google.com/speed/webp?hl=ko](https://developers.google.com/speed/webp?hl=ko)  

CLS (Cumulative Layout Shift)  
[https://web.dev/cls/](https://web.dev/cls/)
[https://web.dev/i18n/ko/optimize-cls/](https://web.dev/i18n/ko/optimize-cls/)  

Font  
[https://d2.naver.com/helloworld/4969726](https://d2.naver.com/helloworld/4969726)

Fade-in animation LCP 관련  
[https://www.debugbear.com/blog/opacity-animation-poor-lcp](https://www.debugbear.com/blog/opacity-animation-poor-lcp)