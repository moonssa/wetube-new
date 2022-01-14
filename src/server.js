import express from "express";


const PORT=4000;
const app = express();

const loggerMiddleware = (req, res, next) => {
    console.log(`${req.method}  ${req.url}`);
    next();
}

const privateMiddleware = (req,res,next) => {
    if(req.url === "/protected"){
        return res.send("<h1>This page not allowed</h1>");
    }
    console.log("allow this page");
    next();
}
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
app.use(privateMiddleware);
app.get("/",handleHome);
app.get("/login", handleLogin);
app.get("/protected",handleProtected);

const handleListening = () => 
    console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(4000, handleListening);