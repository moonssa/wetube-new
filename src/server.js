import express from "express";
import morgan from "morgan"; // external middleware for logger
import session from "express-session";
import flash from "express-flash";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import apiRouter from "./routers/apiRouter";

import { localsMiddleware } from "./middlewares";

const app = express();
const loggerMiddleware = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use((req, res, next) => {
    res.header("Cross-Origin-Embedder-Policy", "require-corp");
    res.header("Cross-Origin-Opener-Policy", "same-origin");
    next();
    });
app.use(loggerMiddleware); 

// It parses incoming requests with urlencoded payloads and is based on body-parser.
app.use(express.urlencoded({extended : true}));
app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({mongoUrl: process.env.DB_URL})
    })
);

app.use(flash());
// 쿠키 내용 확인하려고 임시로 미들웨어 만듬.
/*
app.use((req,res,next) => {
    console.log(req.headers);
    next();
});
*/
/*
app.use ((req, res,next) => {
    req.sessionStore.all((error, sessions) => {
        console.log(sessions);
        next();
    });
});
*/

app.use(localsMiddleware);
app.get("/add-one", (req, res, next) => {
    req.session.potato += 1;
    return res.send(`${req.session.id} ...... ${req.session.potato}`);
});

//express에게 upload url을 알려주어야 한다.
app.use("/uploads", express.static("uploads"))
app.use("/static", express.static("assets"))
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);
app.use("/api", apiRouter);



export default app;

