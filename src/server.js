import express from "express";
import res from "express/lib/response";

const PORT=4000;
const app = express();

const handleHome = (req,res) => {
    res.send("wawoo!!");
//    res.end();
}

const handleLogin = (req,res) => {
    res.send("Login page welcome");
}

app.get("/", handleHome);
app.get("/login", handleLogin);
const handleListening = () => 
    console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(4000, handleListening);