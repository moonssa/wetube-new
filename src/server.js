import express from "express";
import morgan from "morgan"; // external middleware for logger
import session from "express-session";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const app = express();
const loggerMiddleware = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(loggerMiddleware); 

// It parses incoming requests with urlencoded payloads and is based on body-parser.
app.use(express.urlencoded({extended : true}));

app.use(
    session({
        secret: "Hello",
        resave: true,
        saveUninitialized: true,
    })
);

// 쿠키 내용 확인하려고 임시로 미들웨어 만듬.
/*
app.use((req,res,next) => {
    console.log(req.headers);
    next();
});
*/

app.use ((req, res,next) => {
    req.sessionStore.all((error, sessions) => {
        console.log(sessions);
        next();
    });
});

app.get("/add-one", (req, res, next) => {
    req.session.potato += 1;
    return res.send(`${req.session.id} ...... ${req.session.potato}`);
});

app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;

