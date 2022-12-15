const express = require('express')
const app = express();
app.use(express.json())
const PORT = process.env.PORT || 5000
require('./DB/conn')
const Product = require('./schema')
const fileUpload = require('express-fileupload')
app.use(fileUpload({
    useTempFiles: true
}))

const cloud = require('cloudinary').v2
const cors = require('cors')
app.use(cors())


app.get('/get/products', async (req, res) => {
    try {
        let productList = await Product.find({})
        if (productList) {
            res.status(200).send(productList)
        } else {
            res.status(400).send()
        }

    } catch (e) {
        res.status(400).send(e)
    }

})

app.delete('/delete/products', async (req, res) => {
    try {
        const { id } = req.body;
        let response = await Product.deleteOne({ _id: id })
        if (response) {
            res.status(200).send("delete Successful")
        } else {

            res.status(400).send("unSuccessful")
        }
    } catch (e) {
        res.status(400).send(e)
    }

})



app.put('/edit/products', async (req, res) => {
    try {


       
        const {id,name,description,category,price}=req.body;

        console.log(id,name,description,category,price)
          if(req.files!=null){

            cloud.config({
                cloud_name: 'do69xdw9x',
                api_key: '158449624671379',
                api_secret: 'hqlgcrTjSIEVzoBh9XTMDicszWI',
                secure: true
            })
    
            // console.log(req.files)
    
            const data_image = await cloud.uploader.upload(req.files.image_url.tempFilePath);
            if (data_image) {

            let productList = await Product.updateOne({_id:id},{
                $set:{
                    name,
                    description,
                    category,
                    price,
                    image_url:data_image.url
    
                }
            })
    
            if (productList) {
                res.status(200).send(productList)
            } else {
                res.status(400).send()
            }
        }

          }else{
            let productList = await Product.updateOne({_id:id},{
                $set:{
                    name,
                    description,
                    category,
                    price
    
                }
            })
    
            if (productList) {
                res.status(200).send(productList)
            } else {
                res.status(400).send()
            }
        
        }

    } catch (e) {
        res.status(400).send(e)
    }

})





app.post('/create/products', async (req, res) => {

    try {
        const { name, description, category, price } = req.body;
        // console.log(name, description, category, price )


        cloud.config({
            cloud_name: 'do69xdw9x',
            api_key: '158449624671379',
            api_secret: 'hqlgcrTjSIEVzoBh9XTMDicszWI',
            secure: true
        })

        // console.log(req.files)

        const data_image = await cloud.uploader.upload(req.files.image_url.tempFilePath);
        if (data_image) {
            let product = new Product({
                name, description, category, price, image_url: data_image.url
            })

            let data = await product.save()
            if (data) {
                res.status(200).send(data)
            } else {
                res.status(400).send()
            }
        }

    } catch (e) {
        res.status(400).send(e)
    }

})


app.post('/get/productsbyid', async (req, res) => {
    try {
        const {_id}=req.body
     
        let productList = await Product.findOne({_id})
        if (productList) {
            res.status(200).send(productList)
        } else {
            res.status(400).send()
        }

    } catch (e) {
        res.status(400).send(e)
    }

})








app.listen(PORT, () => {
    console.log("listening.....")
})