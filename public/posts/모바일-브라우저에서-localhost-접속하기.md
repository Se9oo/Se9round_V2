---
title: '모바일 브라우저에서 localhost 접속하기'
metaTitle: '모바일 브라우저에서 localhost 접속하기'
description: 'localhost를 모바일 브라우저에서 접속하는 방법'
socialImage: /images/dongdong.jpeg
date: '2023-02-01'
timestamp: 202302010000
tags:
  - localhost
  - browser
  - mobile
---

1. PC와 휴대폰 각각 동일한 wifi로 접속한다.
2. terminal을 열고 아래 명령어를 입력해서 ip를 얻는다.
```markdown
ipconfig getifaddr en0
```
3. 모바일 브라우저에서 ip주소와 port를 입력하면 localhost로 접속된다.
```markdown
ex) http://localhost:3000
```