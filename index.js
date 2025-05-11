var express= require("express")
var bodyParser= require("body-parser")
var mongoose=require("mongoose")

const app=express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/resturantdata')
var db=mongoose.connection
db.on('error',()=> console.log("Error in Connecting to database"))
db.once('open',()=> console.log("Connected to database"))

app.post("/resturant", (req,res)=>{
    var name=req.body.name
    var email=req.body.email
    var phno=req.body.phno
    var food=req.body.food
    var quantity=req.body.quantity
    var address=req.body.address
    var date=req.body.date

    var data={
        "name":name,
        "email":email,
        "phno":phno,
        "food":food,
        "quantity":quantity,
        "address":address,
        "date":date
    }
    db.collection('users').insertOne(data,(err, collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Succeesfully")
    })
    return res.redirect('resturant.html')
})



app.get("/", (req,res)=>{
    res.set({
        "Allow-access-Allow-Origin":"*"
    })
    return res.redirect('resturant.html')
}).listen(3000);

console.log("listening on port 3000");

