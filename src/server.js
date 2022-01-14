import express from "express";
import morgan from "morgan"; // external middleware for logger


const PORT=4000;
const app = express();

const loggerMiddleware = morgan("dev");


const handleHome = (req,res) => {
    return res.send("wawoo!!");
//    res.end();
}

const handleLogin = (req,res) => {
    return res.send("Login page welcome");
}

const handleProtected = (req, res) => {
    return res.send("Welcome my private page")
}

app.use(loggerMiddleware);  // global middleware


app.get("/",handleHome);
app.get("/login", handleLogin);
app.get("/protected",handleProtected);

const handleListening = () => 
    console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(4000, handleListening);