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
-> babel  [클릭](https://babeljs.io/setup#installation)
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

/ -> homepage
/join
/login
/search

/edit-user  -> /users/edit
/delete-user -> /users/delete

/watch-video  -> /videos/watch
/edit-video -> /videos/edit
/delete-video -> /vidos/delete
/videos/comments
/videos/comments/delete

=> router 를 사용하여 도메인화 한다. 