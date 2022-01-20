import express from "express";
import morgan from "morgan"; // external middleware for logger
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

app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;

