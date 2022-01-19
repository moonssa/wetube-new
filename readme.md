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

---
shift-option-F  포매터