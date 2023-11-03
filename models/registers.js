const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const categorySchema = new mongoose.Schema({
    categoryname: {
        type: String,
        required: true,
    },
    
})

const serviceSchema = new mongoose.Schema({
    categoryId: {
        type: String,
        required: true,
    },
    ServiceName:{
        type: String,
        required: true,
    },
    type:{
        type: String,
        required: true,
    },
    priceOptions: {
        type: Number,
        required:true,
    },
})

const servicePriceOptionsSchema = mongoose.Schema({
    serviceId:{
        type: Number,
        required: true,
    },
    duration: {
        type: String,
        required:true,
    },
    price: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
})

categorySchema.methods.generateAuthToken = async function() {
    try {
        const token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token: token});
        await this.save();
        return token;
    } catch (error) {
        console.log("the error part" + error);
    }
}

categorySchema.pre("save", async function(next){
   this.password = await bcrypt.hash(this.password, 10);
   
   next();
});

//now we need to create collections
const Register = new mongoose.model("Register",[categorySchema,serviceSchema,servicePriceOptionsSchema] );
module.exports = Register;