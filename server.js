const express = require("express");
const mongoose = require("mongoose");
const Product = require('./models/productModel')
const app = express()

//middleware
app.use(express.json())

//routes
app.get('/', (req, res) => {
    res.send('This is Home')
})

app.get('/about', (req, res) => {
    res.send('This is About')
})

app.get('/products', async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/products', async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

app.put('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const productToUpdate = await Product.findByIdAndUpdate(id, req.body)
        if(!productToUpdate){
            return res.status(404).json({message: `can not find any product with ID ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

app.delete('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const productToDelete = await Product.findByIdAndDelete(id)
        if(!productToDelete){
            return res.status(404).json({message: `can not find any product with ID ${id}`})
        }
        res.status(200).json(productToDelete)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

mongoose.set("strictQuery", false)

mongoose
.connect('mongodb+srv://admin:Hejsan123@devgongapi.mdl0m1e.mongodb.net/Node-API?retryWrites=true&w=majority&appName=DevGongAPI')
.then(() => {
    console.log('connected to MongoDB')
    app.listen(3000, () => {
        console.log(`Server is running on port 3000`)
    })
}).catch((error) => {
    console.log(error)
})

