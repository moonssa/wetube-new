import express from "express";
import morgan from "morgan"; // external middleware for logger
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";


const PORT=4000;
const app = express();

const loggerMiddleware = morgan("dev");
app.use(loggerMiddleware); 



app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);



const handleListening = () => 
    console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(4000, handleListening);