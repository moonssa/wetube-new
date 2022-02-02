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

