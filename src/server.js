import express from "express";
import res from "express/lib/response";

const PORT=4000;
const app = express();

const gossipMiddleware = (req, res, next) => {
    console.log(`Someone is going to ${req.url}`);
    next();
}
const handleHome = (req,res) => {
    res.send("wawoo!!");
//    res.end();
}

const handleLogin = (req,res) => {
    res.send("Login page welcome");
}

app.get("/", gossipMiddleware, handleHome);
app.get("/login", handleLogin);
const handleListening = () => 
    console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(4000, handleListening);