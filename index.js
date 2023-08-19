var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(express.static('files'))
app.use(bodyParser.urlencoded({
    extended: true
}))

mongoose.connect('mongodb://0.0.0.0:27017/servey_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error', () => console.log("Error in Connecting to Database"));
db.once('open', () => console.log("Connected to Database"))

app.post("/servey", (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var rrn = req.body.rrn;
    var nameco = req.body.nameco;
    var java = req.body.java;
    var python = req.body.python;
    var cpp = req.body.cpp;
    var others = req.body.others;
    var option= req.body.option;

    var data = {
        "name": name,
        "email": email,
        "phno": phno,
        "rrn":rrn,
        "CollegeName":nameco,
        "Programming Language": java,python,cpp,
        "Others":others,
        "Do You Like Programming":option

    }

    db.collection('users').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('success_submit.html')

})


app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('survey.html');
}).listen(500);


console.log("Listening on PORT 500");