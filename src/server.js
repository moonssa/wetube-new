import express from "express";
import res from "express/lib/response";

const PORT=4000;
const app = express();

const loggerMiddleware = (req, res, next) => {
    console.log(`${req.method}  ${req.url}`);
    next();
}

const privateMiddleware = (req,res,next) => {
    if(req.url === "/protected"){
        res.send("<h1>This page not allowed</h1>")
    }
    next();
}
const handleHome = (req,res) => {
    res.send("wawoo!!");
//    res.end();
}

const handleLogin = (req,res) => {
    res.send("Login page welcome");
}

const handleProtected = (req, res) => {
    res.send("Welcome my private page")
}
app.use(loggerMiddleware);  // global middleware
app.use(privateMiddleware);
app.get("/",handleHome);
app.get("/login", handleLogin);
app.get("/protected",handleProtected);
const handleListening = () => 
    console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(4000, handleListening);