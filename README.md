# MemoryStrike
<div align="center">
  <img src="https://github.com/den4592/memorystrike/assets/50400631/21b82216-c507-4486-830a-6dcd0d229c03"/>
</div>

# 프로젝트 소개
MemoryStrike는 학습자가 공부한 내용을 복습 및 셀프 테스팅을 할 수 있는 서비스를 제공합니다. 
복습을 직접 종이에 쓰면서 하는것보다 비교적 쉽게 할 수 있다는 부분이 MemoryStrike의 큰 메리트입니다.
본인이 복습을 하고자 하는 주제와 해당 주제에 대한 설명만 기재하면 MemoryStrike는 이를 기억하여 계속해서 제공해줄 것입니다.
이때까지 복습을 진행하면서 본인이 이해를 했다고 생각한 부분이 기억이 나지 않았던 경험이 있으신가요? 그렇다면 MemoryStrike는 당신을 위한 솔루션입니다.

기존에 존재하였던 [MemoryStrike v1](https://github.com/den4592/memorystrike/tree/cff9ad387967f054662afae3548d2412f8060888)은 데이터를 로컬 스토리지 범위에서만 사용할 수 있어 로컬환경에 의존적이다는 부분이 불편하다는 생각을 하였습니다. 이를 해결하기 위해 별도의 API 서버와 데이터베이스를 구축하였습니다.  그 결과, 더 이상 로컬 스토리지에 의존적이지 않도록 다음과 같은 작업들을 거쳐 새롭게 v2로 마이그레이션 하였습니다.
##  작업 리스트
<ul>
  <li>어디서나 사용할 수 있도록 회원가입/로그인 기능을 추가하였고, 더불어 그와 관련된 부분들을 효율적으로 다룰 수 있도록 useAuth 커스텀 훅을 추가하였습니다.</li>
  <li>사용자 인증의 보안에 있어서, 서버로부터 accessToken 및 refreshToken을 발급하여 각각에 대해 in-memory, localStorage에 저장하도록 하였습니다.</li>
  <li>사용자, 카테고리, 토픽, 통계에 대한 API를 구현하였습니다.</li>
  <li>보다 빠르고 효율적인 렌더링을 위해 useCallback, useMemo 등을 사용하여 메모이제이션의 도움으로 성능에 대한 부분들을 발전시켰습니다.</li>
  <li>Development Experience를 위해서 컴파일 단계에서의 오류를 포착할 수 있도록 TypeScript를 추가하였습니다.</li>
  <li>React의 Portal을 통해 각각 3종류의 모달을 구현하였습니다.</li>
  <li>AWS amplify(클라이언트), EC2(백엔드)를 활용하여 배포를 진행하였습니다.</li>
</ul>
        
  

        

# 실제 서비스 화면
회원가입/로그인 :  
<img src="https://github.com/den4592/memorystrike/assets/50400631/e58c7391-38f4-42a0-b718-46ce96da8fa9">

메인화면 - 메모리 :  
<img src="https://github.com/den4592/memorystrike/assets/50400631/550e280b-5b13-4156-a21a-07ebdd87067d">

메모리 - 카테고리 :
<img src="https://github.com/den4592/memorystrike/assets/50400631/348b8bda-86b2-419b-9e7f-e12aca6674d2">

카테고리 - 토픽 :
<img src="https://github.com/den4592/memorystrike/assets/50400631/765a19b6-fb4c-47b4-8ddb-6ddc43dfe647d2">

통계 :  
<img src="https://github.com/den4592/memorystrike/assets/50400631/9b295443-f9b7-4950-9aeb-c44a98d7b33b">


# 기술 스택
<strong>Front End :</strong>  
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
<img src="https://img.shields.io/badge/typescript-61DAFB?style=for-the-badge&logo=typescript&logoColor=black">
<img src="https://img.shields.io/badge/sass-CC6699?style=for-the-badge&logo=sass&logoColor=white">  
<strong>Back End :</strong>  
<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
<img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">
<img src="https://img.shields.io/badge/mongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white">  
<strong>Deployment :</strong>  
<img src="https://img.shields.io/badge/aws amplify-FF9900?style=for-the-badge&logo=aws amplify&logoColor=white"> 
<img src="https://img.shields.io/badge/amazon ec2-FF9900?style=for-the-badge&logo=amazon ec2&logoColor=white">  

# 시작 가이드
설치 :  
```
git clone https://github.com/den4592/memorystrike.git
cd memorystrike
```

클라이언트 :  
```
cd client
npm install
npm start
```
서버 :  
```
cd backend
npm install
npm start
```

# 배포 주소
클라이언트 : https://memorystrike.com  
서버 : https://api.memorystrike.com/api

# 폴더 구조
```
memorystrike
├─ backend
│  ├─ app.js
│  ├─ controllers
│  │  ├─ contents-controller.js
│  │  ├─ statistics-controller.js
│  │  ├─ topics-controller.js
│  │  └─ user-controller.js
│  ├─ middleware
│  │  └─ auth.js
│  ├─ models
│  │  ├─ content.js
│  │  ├─ dates.js
│  │  ├─ http-error.js
│  │  ├─ statistic.js
│  │  ├─ topic.js
│  │  └─ user.js
│  ├─ nodemon.json
│  ├─ package-lock.json
│  ├─ package.json
│  └─ routes
│     ├─ contents-routes.js
│     ├─ statistics-routes.js
│     ├─ topics-routes.js
│     └─ user-routes.js
└─ client
   ├─ .env
   ├─ README.md
   ├─ dist
   │  ├─ assets
   │  │  ├─ css
   │  │  │  └─ index-b9ab234e.css
   │  │  ├─ img
   │  │  │  ├─ arrow-link-a47d9043.svg
   │  │  │  ├─ back-363a36bc.svg
   │  │  │  ├─ calendar-8993e9a3.svg
   │  │  │  ├─ check-25707971.svg
   │  │  │  ├─ close-b27a5614.svg
   │  │  │  ├─ edit-39d91d9c.svg
   │  │  │  ├─ exclamation-63e3c27a.svg
   │  │  │  ├─ memorystrike_logo-79df968b.png
   │  │  │  ├─ pause-a54cd747.svg
   │  │  │  ├─ play-dc202a87.svg
   │  │  │  ├─ remove-5a269c53.svg
   │  │  │  └─ shuffle-c8d616e7.svg
   │  │  └─ js
   │  │     └─ index-aeb440c0.js
   │  └─ index.html
   ├─ index.html
   ├─ package-lock.json
   ├─ package.json
   ├─ public
   │  ├─ favicon.ico
   │  ├─ manifest.json
   │  ├─ model
   │  │  └─ memory_strike_brain.glb
   │  └─ robots.txt
   ├─ src
   │  ├─ App.tsx
   │  ├─ api
   │  │  ├─ content
   │  │  │  ├─ createContent.ts
   │  │  │  ├─ deleteContent.ts
   │  │  │  ├─ editContent.ts
   │  │  │  └─ getContents.ts
   │  │  ├─ index.ts
   │  │  ├─ login.ts
   │  │  ├─ signup.ts
   │  │  ├─ statistic
   │  │  │  ├─ createStatistic.ts
   │  │  │  ├─ getStatistics.ts
   │  │  │  └─ getStatisticsDay.ts
   │  │  ├─ topic
   │  │  │  ├─ createTopic.ts
   │  │  │  ├─ deleteTopic.ts
   │  │  │  ├─ editTopic.ts
   │  │  │  └─ getTopics.ts
   │  │  └─ user
   │  │     ├─ changeFirstLoginStatus.ts
   │  │     └─ getUser.ts
   │  ├─ assets
   │  │  ├─ images
   │  │  │  └─ memorystrike_logo.png
   │  │  ├─ memory_strike_brain.glb
   │  │  └─ svgs
   │  │     ├─ arrow-link.svg
   │  │     ├─ arrow-right-to-bracket-solid.svg
   │  │     ├─ back.svg
   │  │     ├─ calendar.svg
   │  │     ├─ check.svg
   │  │     ├─ close.svg
   │  │     ├─ edit.svg
   │  │     ├─ exclamation.svg
   │  │     ├─ pause.svg
   │  │     ├─ play.svg
   │  │     ├─ remove.svg
   │  │     ├─ shuffle.svg
   │  │     └─ xmark.svg
   │  ├─ auth
   │  │  ├─ index.scss
   │  │  └─ index.tsx
   │  ├─ index.scss
   │  ├─ index.tsx
   │  ├─ packages
   │  │  └─ nivo-calendar
   │  │     └─ index.d.ts
   │  ├─ pages
   │  │  ├─ Memory
   │  │  │  ├─ components
   │  │  │  │  ├─ Content
   │  │  │  │  │  ├─ index.scss
   │  │  │  │  │  └─ index.tsx
   │  │  │  │  ├─ ContentCard
   │  │  │  │  │  ├─ index.scss
   │  │  │  │  │  └─ index.tsx
   │  │  │  │  ├─ CreateContent
   │  │  │  │  │  ├─ index.scss
   │  │  │  │  │  └─ index.tsx
   │  │  │  │  ├─ ShuffledResult
   │  │  │  │  │  ├─ index.scss
   │  │  │  │  │  └─ index.tsx
   │  │  │  │  ├─ ShuffledTopicCard
   │  │  │  │  │  ├─ index.scss
   │  │  │  │  │  └─ index.tsx
   │  │  │  │  ├─ ShuffledTopics
   │  │  │  │  │  ├─ index.scss
   │  │  │  │  │  └─ index.tsx
   │  │  │  │  ├─ TopicCard
   │  │  │  │  │  ├─ index.scss
   │  │  │  │  │  └─ index.tsx
   │  │  │  │  └─ TopicForm
   │  │  │  │     ├─ index.scss
   │  │  │  │     └─ index.tsx
   │  │  │  ├─ index.scss
   │  │  │  └─ index.tsx
   │  │  └─ Statistics
   │  │     ├─ components
   │  │     │  ├─ StatisticsChart
   │  │     │  │  ├─ index.scss
   │  │     │  │  └─ index.tsx
   │  │     │  └─ StatisticsTable
   │  │     │     ├─ index.scss
   │  │     │     └─ index.tsx
   │  │     └─ index.tsx
   │  ├─ reset.css
   │  ├─ shared
   │  │  ├─ common.scss
   │  │  ├─ components
   │  │  │  ├─ ConfirmModal
   │  │  │  │  ├─ ConfirmModalPortal
   │  │  │  │  │  └─ index.tsx
   │  │  │  │  ├─ index.scss
   │  │  │  │  └─ index.tsx
   │  │  │  ├─ Footer
   │  │  │  │  ├─ index.scss
   │  │  │  │  └─ index.tsx
   │  │  │  ├─ HowToUseModal
   │  │  │  │  ├─ HowToUseModalPortal
   │  │  │  │  │  └─ index.tsx
   │  │  │  │  ├─ index.scss
   │  │  │  │  └─ index.tsx
   │  │  │  ├─ Modal
   │  │  │  │  ├─ ModalPortal
   │  │  │  │  │  └─ index.tsx
   │  │  │  │  ├─ index.scss
   │  │  │  │  └─ index.tsx
   │  │  │  ├─ Sidebar
   │  │  │  │  ├─ index.scss
   │  │  │  │  └─ index.tsx
   │  │  │  └─ Timer
   │  │  │     ├─ index.scss
   │  │  │     └─ index.tsx
   │  │  └─ context
   │  │     └─ auth.context.tsx
   │  ├─ types
   │  │  ├─ contents.d.ts
   │  │  ├─ react-table-config.d.ts
   │  │  ├─ statistics.d.ts
   │  │  ├─ topics.d.ts
   │  │  └─ user.d.ts
   │  ├─ utils
   │  │  ├─ ScrollToTop.tsx
   │  │  └─ validation.ts
   │  └─ vite-env.d.ts
   ├─ svg.d.ts
   ├─ tsconfig.json
   └─ vite.config.ts

```



