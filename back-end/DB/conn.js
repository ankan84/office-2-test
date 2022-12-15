const mongoose =require('mongoose')
const url=`mongodb://127.0.0.1:27017/office2`

mongoose.connect(url,{

}).then(()=>{
    console.log("successful")
}).catch(()=>{
    console.log("un-successful")
})

