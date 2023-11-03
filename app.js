
const express = require("express");
require("./db/conn");
const hbs = require("hbs");
const path = require("path");
const Register = require("./models/registers");
const app = express();
const RegisterRouter = require("./routers/routes");
const PORT = process.env.PORT || 3000;

const template_Path = path.join(__dirname, "../templates/views");

app.use(RegisterRouter);

app.set("view engine", "hbs");
app.set("views", template_Path);



app.listen(port, ()=>{
    console.log(`listening to the port no ${PORT}`);
})