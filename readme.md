1. nodeJS 
Ryan , browser 내에 있는 것을 분리. 
브라우저 바깥에서 사용하는 자바 스크립트.
터미널에서 node console.log("Hi") 와 같이 실행가능.
node js install 하려면 ? 
> node -v 
> brew install node@16  
-> 스테이블한 버전은 모든 버전이 있는게 아니니, 찾아서 설치.
-> link, unlink 사용하여 설치해둔 버전 바꾸어가며 사용가능.
> brew unlink node@16 && link node@17

2. npm 
패키지 매니저. 
nodejs install될때 함께 설치 된다. 
> npm -v 

3. express
node JS 를 위한 서버프레임워크. 안정적.
> npm i install 

<2장>

2.1  ~ 2.2
> npm init

-> packages.json 을 만든다. 수동으로 만들 수 있지만, 자동으로 만드는게 안정적.

> npm i express

-> packages.json 의 dependencies에 내용추가 된것 확인가능. 

2.3 babel

-> 자바스크립트 컴파일러

-> 최신 자바스크립트를 old 버전의 자바스크립트로 바꾸어주는 툴킷.

babel :  [클릭](https://babeljs.io/setup#installation)
1. > npm install --save-dev @babel/core

    -> babel package install

2. > touch babel.config.json

    -> babel.config.json 파일 생성 후 아래 내용 넣기.

    ```
    {
        "presets": ["@babel/preset-env"]
    }
    ```

3. > npm install --save-dev @babel/preset-env

    -> **--save-dev** 는 개발자 옵션으로 package.json 파일의 devDependencies에 패키지 내용이 추가된다. 

2.4 nodemon

> npm install --save-dev nodemon 

```
 "scripts": {
    "dev": "nodemon --exec babel-node src/server.js"
  },
```
> npm run dev

-> 파일이 바뀌면 자동으로 restart.

<4장>


global router : 홈페이지에서 바로 갈수 있는 페이지들.
- / -> homepage
- /join
- /login
- /search

user router
- /users/:id -> See user
- /users/logout
- /users/edit -> Edit my profile
- /users/delete -> Delete my profile

video router
- /videos/:id  -> see Video
- /videos/:id/edit -> Edit video
- /vidos/:id/delete
- /videos/upload
- /videos/comments
- /videos/comments/delete

=> router 를 사용하여 도메인화 한다. 

<4장> 

정규표현식 테스트 사이트
https://www.regexpal.com

\w+: 모든 문자, 숫자 선택
\d+: 모든 숫자 선택

<5장>

 
Pug:
1. 퍼그를 설치한다.
    >npm i pug
    >https://www.npmjs.com/package/pug

2. express 에게 view engine으로 pug를 쓸 것을 알려준다.
    >app.set("view engine", "pug")

3. 퍼그 파일들을 저장할 default directory인   **views**를 만든다.

<5.6> MVP Style : 기본적인 CSS세팅을 가능하게 해준다.
https://andybrewer.github.io/mvp/

pug 파일에 다음과 같이 추가한다. 

>link(rel="stylesheet" href="https://unpkg.com/mvp.css">)

pug syntax:
1. 태그하나에 변수하나
    >h1=pageTitle
2. 태그에 변수와 문자 혼용해서 쓸경우
    >h1 #{pageTitle} hahaha


<6장>
**req.body**

req.body에는 form을 통해 submit된 데이터의 키-값 쌍을 포함합니다.
기본적으로는 undefined이며 express.json() 또는 express.urlencoded()와 같은 바디 파싱 미들웨어를 사용할 때 값을 받아옵니다.
built in middleware
https://expressjs.com/ko/api.html#express.urlencoded

>app.use(express.urlencoded({ extended: true }));


<mongo DB>


MongoDB 다운로드 사이트
https://docs.mongodb.com/manual/installation

MongoDB 설치 (MacOS용)
터미널에서 아래와 같이 입력하시면 됩니다.

1. >xcode-select --install

2. >brew tap mongodb/brew

    (Homebrew 설치가 안 되있으면 설치 필요)

3. >brew install mongodb-community@5.0

4. >mongod 

5. >mongo

-> 오류나면 ??

6. >mongod --config /usr/local/etc/mongod.conf --fork

7. >npm i mongoose

8. mongo 실행시켜서 아이피주소 받는다.
mongodb://127.0.0.1:27017/

CRUD : 
- create
- read
- update
- delete


> "hello, hash, 333".split(",").map(word => `#${word}`)

> mongo
> use wetube (dbname)
> use collections


<mongoDB id  regular expression>
http://regexpal.com

https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Regular_Expressions


mongoose 에서 middleware 제공.
예) video영상 저장하기전에 여러 확인 작업 거치고 db 저장.
이때 제공하는 함수가 미들웨어.

DB생성 전에 model.pre 라는 미들웨어를 만들어 일정 작업 후 Db에 저장. 
```
videoSchema.pre("save", async function () {
  this.hashtags = this.hashtags[0]
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});
```

models.static  을 이용해서 hashtags 함수 구현가능하다.
```
videoSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word.trim()}`));
});
```



---
shift-option-F  포매터

해쉬함수 테스트
https://emn178.github.io/online-tools/sha256.html

bcrypt

https://www.npmjs.com/package/bcrypt


$or 연산자는 둘 이상의 조건에 대해 논리적 OR 연산을 수행하고 조건 중 하나 이상을 충족하는 문서를 선택합니다.
https://docs.mongodb.com/manual/reference/operator/query/or/#mongodb-query-op.-or


bcrypt를 이용해서 비밀번호 비교

password: 유저가 입력한 비밀번호
user.passwordHash: DB에 해시화되서 저장된 비밀번호
```
const match = await bcrypt.compare(password, user.passwordHash);
```
https://www.npmjs.com/package/bcrypt


session : back-end 브라우저 간에 어떤 활동을 했는지 기억하는 것. 일정 시간이 지나면 그 기록은 지워짐.
-> 작동 위해서는 브라우저와 백엔드간에 쿠키를 교환.

express-session
Express용 세션 미들웨어
세션 데이터는 쿠키 자체에 저장되지 않고 세션 ID에만 저장됩니다. 세션 데이터는 서버 측에 저장됩니다.

npm i express-session
https://www.npmjs.com/package/express-session

session middleware를 설치하면 req property에 session 속성을 추가해줌.
```
app.use(
    session({
        secret: "Hello",
        resave: true,
        saveUninitialized: true,
    })
);
```
-> req.session 사용이 가능하게 됨.


**res.locals**

request 범위가 지정된 response 로컬 변수를 포함하는 객체이므로 request, response 주기동안 렌더링된 view에서만 사용할 수 있습니다.
(Pug나 EJS같은 템플릿 엔진에서 사용 가능하다는 의미)
이 속성은 request path, 인증된 사용자, 사용자 설정 등과 같은 request level의 정보를 노출하는 데 유용합니다.
```
// 사용 예시
app.use(function (req, res, next) {
res.locals.user = req.user
res.locals.authenticated = !req.user.anonymous
next()
})
```
https://expressjs.com/ko/api.html#res.locals


session 을 mongoDB에 저장하기 위해서..
connect-mongo
Typescript로 작성된 Connect 및 Express용 MongoDB 세션 저장소.
npm i connect-mongo
https://www.npmjs.com/package/connect-mongo



Set-Cookie
Set-Cookie HTTP 응답 헤더는 서버에서 사용자 브라우저에 쿠키를 전송하기 위해 사용됩니다.
https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/Set-Cookie

쿠키에 설정가능한 옵션
Domain
쿠키가 적용되어야 하는 호스트를 지정.

Expires
HTTP 타임스템프로 기록된 쿠키의 최대 생존 시간(수명).

Max-Age
쿠키가 만료될 때 까지의 시간 (밀리세컨드)

secret
이것은 세션 ID 쿠키에 서명하는 데 사용되는 비밀입니다.
https://www.npmjs.com/package/express-session

COOKIE_SECRET에 넣을 랜덤 문자열 생성 사이트
https://randomkeygen.com/



dotenv
Dotenv는 .env 파일에서 process.env로 환경 변수를 로드하는 제로 종속성 모듈입니다.
npm i dotenv
https://www.npmjs.com/package/dotenv

방법1. import dotenv from "dotenv", dotenv.config()
방법2. import "dotenv/config"


Authorizing OAuth Apps
다른 사용자가 OAuth 앱을 승인하도록 할 수 있습니다.
GitHub의 OAuth 구현은 웹 브라우저에 대한 액세스 권한이 없는 앱에 대한 표준 인증 코드 부여 유형 및 
OAuth 2.0 장치 인증 부여를 지원합니다.

Web application flow
웹 애플리케이션 흐름: 브라우저에서 실행되는 표준 OAuth 앱에 대해 사용자에게 권한을 부여하는 데 사용됩니다.
앱 사용자에게 권한을 부여하는 웹 애플리케이션 흐름은 다음과 같습니다.
1. 로그인하려는 사이트에서 유저의 GitHub identity를 request하기 위해 유저를 GitHub 페이지로 리다이렉트시킵니다.
2. 유저는 리다이렉트된 GitHub에서 승인을 하고, GitHub에 의해 다시 로그인하려는 사이트로 리다이렉트됩니다.
3. 로그인 하려는 사이트는 유저의 액세스 토큰을 통해 API에 접근합니다.
https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps

깃허브 OAuth Apps Setting
GitHub API를 사용하기 위해 등록한 애플리케이션입니다.
https://github.com/settings/developers

Scopes for OAuth Apps (OAuth 앱의 범위)
https://docs.github.com/en/developers/apps/building-oauth-apps/scopes-for-oauth-apps

Creating an OAuth App (OAuth앱 만들기)
https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app



Scopes for OAuth Apps
OAuth 앱은 초기 리디렉션에서 범위를 요청할 수 있습니다. %20을 사용하여 공백으로 구분하여 여러 범위를 지정할 수 있습니다.
// 사용 예시
```
https://github.com/login/oauth/authorize?client_id=...&scope=user%20repo_deployment
```
https://docs.github.com/en/developers/apps/building-oauth-apps/scopes-for-oauth-apps

URLSearchParams
URLSearchParams 인터페이스는 URL의 쿼리 문자열에 대해 작업할 수 있는 유틸리티 메서드를 정의합니다.
https://developer.mozilla.org/ko/docs/Web/API/URLSearchParams

URLSearchParams.toString()
toString() 은 URLSearchParams 인터페이스의 메소드로서, URL에서 사용할 수 있는 쿼리 문자열을 리턴합니다.
https://developer.mozilla.org/ko/docs/Web/API/URLSearchParams/toString



fetch
npm i node-fetch


Use the access token to access the API
액세스 토큰을 사용하면 유저를 대신해 API에 요청할 수 있습니다.
```
Authorization: token OAUTH-TOKEN
GET https://api.github.com/user
```
https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps#3-use-the-access-token-to-access-the-api

*file-upload - multer
https://www.npmjs.com/package/multer

1. > npm i multer
2. middlewares.js 에 
> export const uploadFiles = multer({dest: "uploads/"});
3. router에서 uploadfiles 이용한다. 


Webpack
https://blog.ag-grid.com/webpack-tutorial-understanding-how-it-works/

1. webpack 설치
npm i webpack webpack-cli -D

Webpack 시작하기: https://webpack.kr/guides/getting-started/
Webpack 설정: https://webpack.kr/concepts/configuration/

Typescript환경에서 Webpack 설정하기
npm install --save-dev typescript ts-loader webpack webpack-cli
https://webpack.kr/guides/typescript/



path.resolve([...paths])
path.resolve() 메서드는 경로 세그먼트 시퀀스를 절대 경로로 해석하는 데 사용됩니다. 경로 세그먼트가 전달되지 않으면 path.resolve()는 현재 작업 디렉토리의 절대 경로를 반환합니다.
(__dirname: 현재 파일 위치의 절대 경로)

```
path.resolve('/foo/bar', './baz');
// Returns: '/foo/bar/baz'
```
https://nodejs.org/api/path.html#pathresolvepaths

2. babel-loader
npm install babel-loader -D
https://github.com/babel/babel-loader

webpack loader
https://webpack.kr/loaders/

webpack babel-loader
https://webpack.kr/loaders/babel-loader/


3. mode를 설정해주지 않으면 기본적으로 production으로 설정되어 client/js폴더 내에 작성한 main.js를 변환했을 때, 빈 파일로 나올 수 있다. module.export안에 mode: "development"로 설정.

----

sass, sass-loader, css-loader, style-loader 설치
npm i sass sass-loader css-loader style-loader -D

sass-loader
Sass/SCSS 파일을 로드하고 CSS로 컴파일합니다.
https://webpack.js.org/loaders/sass-loader/

SCSS
Variable
Sass 변수는 간단합니다. $로 시작하는 이름에 값을 할당하면 값 자체 대신 해당 이름을 참조할 수 있습니다.
```
$base-color: #c6538c;
$border-dark: rgba($base-color, 0.88);

.alert {
border: 1px solid $border-dark;
}
```
https://sass-lang.com/documentation/variables

@import
@import CSS at-rule은 다른 스타일 시트에서 스타일 규칙을 가져오는 데 사용됩니다.
https://developer.mozilla.org/en-US/docs/Web/CSS/@import
https://sass-lang.com/documentation/at-rules/import#plain-css-imports


MiniCssExtractPlugin
이 플러그인은 CSS를 별도의 파일로 추출합니다. CSS가 포함된 JS 파일별로 CSS 파일을 생성합니다. mini-css-extract-plugin을 css-loader와 결합하는 것이 좋습니다.
npm install --save-dev mini-css-extract-plugin
https://webpack.kr/plugins/mini-css-extract-plugin/

MiniCssExtractPlugin Options
```
plugins: [new MiniCssExtractPlugin({ filename: "css/style.css" })]
```
https://webpack.js.org/plugins/mini-css-extract-plugin/#publicpath

CssMinimizerWebpackPlugin
https://webpack.kr/plugins/css-minimizer-webpack-plugin/

-------------------------------

Watch and WatchOptions
Webpack은 파일이 변경될 때마다 이를 감지하여 다시 컴파일 할 수 있습니다.

watch
watch 모드를 켭니다. 이제 초기 빌드 후 webpack은 해석 된 파일의 변경 사항을 계속 감시합니다. (webpack.config.js에 entry에 지정한 파일을 감시한다.)
https://webpack.kr/configuration/watch/

clean : true
clean 모드를 켭니다. 
output 빌드전에 기존 디렉토리(assets)를 지웁니다.

Nodemon
nodemon은 디렉토리의 파일 변경이 감지되면 노드 응용 프로그램을 자동으로 다시 시작하여 node.js 기반 응용 프로그램을 개발하는 데 도움이 되는 도구입니다.
https://github.com/remy/nodemon

Sample nodemon.json
https://github.com/remy/nodemon/blob/master/doc/sample-nodemon.md

Nodemon Config file
https://github.com/remy/nodemon#config-files

font

https://cdnjs.com/libraries/font-awesome

Reset CSS
https://meyerweb.com/eric/tools/css/reset

FontAwesome CDN
https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css


HTMLMediaElement
HTMLMediaElement는 오디오와 비디오에 통용되는 미디어 관련 확장성을 제공하기 위해 HTMLElement에 메소드와 프로퍼티를 추가한 인터페이스입니다. HTMLVideoElement 와 HTMLAudioElement (en-US) 는 이 인터페이스를 상속합니다.
https://developer.mozilla.org/ko/docs/Web/API/HTMLMediaElement

HTMLVideoElement
HTMLVideoElement 인터페이스는 Video object를 조작하는데 필요한 프로퍼티와 메소드를 제공합니다. HTMLMediaElement와 HTMLElement를 상속합니다.
https://developer.mozilla.org/ko/docs/Web/API/HTMLVideoElement


< Time setting >
HTMLMediaElement
https://developer.mozilla.org/ko/docs/Web/API/HTMLMediaElement

Audio, Video 등에 사용 가능한 이벤트

loadeddata (en-US)
미디어의 첫번째 프레임이 로딩 완료된 시점에 발생합니다.

loadedmetadata (en-US)
메타데이터가 로드 된 시점에 발생합니다.

timeupdate (en-US)
currentTime 속성이 변경되는 시점에 발생합니다.

이벤트 발생순서
loadedmetadata -> loadeddata -> canplay -> canplaythrough
https://developer.mozilla.org/ko/docs/Web/API/HTMLMediaElement#%EC%9D%B4%EB%B2%A4%ED%8A%B8




< Fullscreen API>
Fullscreen API 는 특정 요소 Element(와 해당 자손들을)를 full-screen mode로 표시하고, 더 이상 필요하지 않으면 full-screen mode를 종료하는 메서드를 추가합니다.

Element.requestFullscreen() (en-US)
유저 에이전트가 지정한 요소(그리고 그 자손들까지)를 full-screen mode로 설정하고, 브라우저의 모든 UI 요소와 다른 모든 애플리케이션을 화면에서 제거하도록 요구합니다. full-screen mode가 활성화되면 Promise resolved를 반환합니다.

Document.exitFullscreen() (en-US)
user agent 가 full-screen mode에서 창 모드로 다시 전환되도록 요청합니다. full-screen mode가 완전히 종료되면 Promise resolved 를 반환합니다.

DocumentOrShadowRoot.fullscreenElement (en-US) (사용 추천)
fullscreenElement 속성은 DOM(혹은 shadow DOM)에서 현재 full-screen mode로 표시되는 요소Element를 알려줍니다. 이것이 null인 경우, document는 full-screen mode가 아닙니다.

Document.fullscreen (en-US) (더 이상 사용되지 않는 속성)
(fullscreenElement처럼 풀스크린을 감지할 수 있지만 사용 비추천)
문서에 현재 full-screen mode로 표시되는 요소가 있는 경우 true, 그렇지 않으면 false의 Boolean 값입니다.

https://developer.mozilla.org/ko/docs/Web/API/Fullscreen_API

<동영상 녹화>

https://developer.mozilla.org/ko/docs/Web/API/MediaDevices/getUserMedia