const express = require("express");
const router =  new express.Router();
const Register = require("../models/registers");


router.get("/" , (req, res)=>{
    res.send("Home page");
});
router.get("/login", async (req, res)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;

        const useremail = await Register.findOne({ email:email});
        const isMatch = await bcrypt.compare(password, useremail.password);

        const token = await useremail.generateAuthToken();
        res.cookie("jwt", token,{
            expires:new Date(Date.now()+600000),
            httpOnly:true,
        });
        if (isMatch) {
            res.status(201).render("index");
        } else {
            res.send("invalid Login details");
        }
    } catch (error) {
        res.status(400).send('Invalid Email')
    }
});






//post the category
router.post("/registers", async (req, res)=>{
   try {
    const registerCategory = new Register({
        categoryname: req.body.categoryname,
        categoryId: req.body.categoryId,
        servicename: req.body.servicename,
        type: req.body.type,
        priceOptions: req.body.priceOptions,
        serviceId: req.body.serviceId,
        duration: req.body.duration,
        price: req.body.price,
        type: req.body.type,
    })
    const registered = await registerCategory.save();
    res.status(201).send(registered);
   } catch (error) {
    res.status(400).send(error);
   } 
})
//get the list of all categories
router.get("/registers", async (req, res)=>{
    try {
        const getData = await Register.find();
        res.send(getData);
    } catch (error) {
        res.send(error)
    }
})

//update single category
router.put("/registers/:id", async (req, res)=>{
    try {
        const _id = req.params.id;
        const updateCategory = await Register.findByIdAndUpdate(_id, req.body,{new: true,});
        res.send(updateCategory);
    } catch (error) {
        res.status(400).send(e);
    }
})

//delete single category
router.delete("/registers/:id", async (req, res)=>{
    try {
        const deleteCategory = await Register.findByIdAndDelete(req.params.id);
        if (!req.params.id) {
            return res.status(400).send();
        } else {
            res.send(deleteCategory);
        }
    } catch (error) {
        res.status(400).send(error);
    }
})


// Create an API to add services as per the Service Schema.
router.post("/registers", async (req, res)=>{
    try {
        const registerService = new Register({
            categoryId: req.body.categoryId,
            servicename: req.body.servicename,
            type: req.body.type,
            priceOptions: req.body.priceOptions,
            serviceId: req.body.serviceId,
            duration: req.body.duration,
            price: req.body.price,
            type: req.body.type,
        })
        const registered = await registerService.save();
        res.send(registered);
    } catch (error) {
        res.send(error);
    }
})

//Create an API to get a list of all services inside any category.
router.get("/registers", async (req, res)=>{
    try {
        const _id = req.params.id;
        const getData = await Register.findById(_id);
        if (!getData) {
            return res.status(400).send();
        } else {
            res.send(getData);
        }
        res.send(getData);
    } catch (error) {
        res.send(error)
    }
})

//Create an API to remove service from category.
router.delete("/registers/:id", async (req, res)=>{
    try {
        const deleteService = await Register.findByIdAndDelete(req.params.id);
        if (!req.params.id) {
            return res.status(400).send();
        } else {
            res.send(deleteService);
        }
    } catch (error) {
        res.status(400).send(error);
    }
})

//Create an API to update service as per the service schema.
router.put("/registers/:id", async (req, res)=>{
    try {
        const _id = req.params.id;
        const updateService = await Register.findByIdAndUpdate(_id, req.body,{new: true,});
        res.send(updateService);
    } catch (error) {
        res.status(400).send(e);
    }
})

module.exports = router;