const express = require('express')
const app = express()
var MongoClient = require('mongodb').MongoClient;

const port = process.env.POST || 5000
var path = require('path')
var bodyParser = require('body-parser');

var url = "mongodb://localhost:27017/";


app.use(bodyParser({extended:false}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json({extended :true}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine','ejs')


app.get('/', function (req, res) {
    res.render("index")
});
app.get('/book', function (req, res) {
     res.render("Book")
});
 
// login Section
app.post("/login",(req,res)=>{ 
    console.log("here")

    let  id  = req.body.id // email
    let  pass  = req.body.pass // password

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("traworld");
        var myobj = { email: id, pass: pass };
        dbo.collection("customers").insertOne(myobj, function(err, ress) {
          if (err) throw err;
          console.log("1 document inserted");
          res.render("index")
          db.close();
        });
      });
})
// Book Section
app.post("/form",(req,res)=>{ 
  console.log("here")

  let  Name  = req.body.Name 
  let  Number  = req.body.Number
  let  Datee  = req.body.Datee
  let  date1 = req.body.date1

  MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("traworld");
      var myobj = { text: Name, number: Number, datee: Datee, date1: date1  };
      dbo.collection("customers").insertOne(myobj, function(err, ress) {
        if (err) throw err;
        console.log("1 document inserted");
        res.render("index")
        db.close();
      });
    });
})

// Contact Section
app.post("/contact",(req,res)=>{ 
  console.log("here")

  let  Name  = req.body.Name 
  let  Email  = req.body.Email
  let  Number  = req.body.Number
  let  Subject = req.body.Subject
  let  msg  = req.body.msg

  MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("traworld");
      var myobj = { text: Name, email: Email , numberr: Number, text: Subject, message: msg  };
      dbo.collection("customers").insertOne(myobj, function(err, ress) {
        if (err) throw err;
        console.log("1 document inserted");
        res.render("index")
        db.close();
      });
    });
})

app.listen(port , ()=>{
    console.log(`server is running on http://localhost:${port}`)
})