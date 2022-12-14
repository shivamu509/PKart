const mongoose=require('mongoose')

try{

    exports.dbConn=async ()=>{
        const dbURL="mongodb+srv://shivamu509:shivam12@cluster0.keoqh.mongodb.net/cartdb?retryWrites=true&w=majority"
        await mongoose.connect(dbURL,{useNewUrlParser:true,useUnifiedTopology:true})
        console.log("Database Connected")
    }
}catch(err){
    console.log(`Database Connection error: ${err.message}`)
}
