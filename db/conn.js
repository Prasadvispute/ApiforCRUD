const mongoose = require("mongoose");
mongoose.set("strictQuerry", false);
mongoose
.connect("mongodb://localhost:27017/category-api")
.then(()=>{
    console.log("connection is successful");
})
.catch(()=>{
    console.log("No Connection");
})