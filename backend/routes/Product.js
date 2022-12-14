const express = require('express');
const { Product } = require('../models/product')

const router = express.Router();

router.get('/', async (req, res) => {
    let value = {};
    let check = false;
    
    if (req.query.id) {
        let id = req.query.id;
        value = { _id: id }
        check = true;
    }
    if (!check && req.query.name) {
        let name = req.query.name;
        value = { product_name: name };
        check = true;
    }
    if (!check && req.query.price) {
        let price = req.query.price;
        value = { product_price: price };
        check = true;
    }
    
    try {
        let product = await Product.find(value);
        let length = product.length;
        if (length > 0) {
            return res.status(200).json({
                message: "Course retrive successfully",
                product
            })
        }
        else {
            res.status(404).send({
                message: "No data found"
            });
        }
    } catch (err) {
        res.status(500).send({
            message: "Something went wrong",
            error: err.message
        })
    }
})


router.post('/', async (req, res) => {
    const { product_name, product_price, product_description, product_image } = req.body;
    let error = ""
    if (product_name == "" && error == "") {
        error = "Missing product name"
        res.status(400).send({
            message: error
        })
    }
    if (product_price == "" && error == "") {
        error = "Missing product price"
        res.status(400).send({
            message: error
        })
    }

    const productObj = { product_name, product_price, product_description, product_image };
    const product = new Product(productObj);
    try {
        await product.save();

        res.status(200).send({
            mesage: "Data saved successfully",
            product
        })

    } catch (err) {
        res.status(500).send({
            message: "Something went wrong",
            error: err.mesage
        })
    }

})

router.put("/:id", async (req, res) => {
    try {
        const { product_name, product_price, product_description, product_image } = req.body;

        let id = req.params.id;
        await Product.findByIdAndUpdate(id, { product_name, product_price, product_description, product_image })
        let product = await Product.findById(id);
        
        res.status(200).send({
            message: "Data updated successfully",
            result: product
        })
    } catch (err) {
        res.status(500).send({
            message: "Something went wrong",
            error: err.message
        })
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        let product = await Product.findByIdAndDelete(id);
        res.status(200).send({
            message: "Data deleted",
            data: product
        })
    } catch (err) {
        res.status(500).send({
            message: "Something went wrong",
            error: err.message
        })
    }
})


module.exports = router;



