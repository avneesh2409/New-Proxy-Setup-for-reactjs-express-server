const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const multer = require("multer");
const app = express();
const port = process.env.PORT || 5000;

//-----------------------------------------------------------//
// var formidable = require('formidable')
// var fs = require('fs');
const User = require('./models/model')
//-----------------------------------------------------------//
app.use( express.static( "uploads" ) );
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.get('/api/hello', (req, res) => {
  User.findAll().then(users => {
    console.log("All users:")
    res.render('show_details',{users})
  })
});
app.delete('/api/delete/:id',(req,res)=>{
 
    User.destroy({
      where: {
        ID : req.params.id

      }
  })
  res.send("successfully deleted")
})
app.post('/api/login', (req, res) => {
  console.log(req.body)
  User.findAll().then(users => {
    users.map(e => {
      if (e.number == req.body.username && e.token == req.body.password) {
         res.render('head',{user:e})
      }
    })
  })
})

app.post('/api/register', (req, res) => {
  //---------------------Image Uploaded-----------------------//

  const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: function (req, file, cb) {
      cb(null,file.originalname);
    }
  });
  const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
  }).single("file");

  upload(req, res, (err) => {
    console.log("Request ---", req.body);
    console.log("Request file ---", req.file);//Here you get file.
    let data = {
      number: req.body.username,
      token: req.body.password,
      image_uploaded: req.file.originalname
    }
    User.create(data).then(jane => {
      console.log("auto-generated ID:" + jane.id);
      res.send("successfully registered "+ jane.number +"<a href='/api/login'>Login here</a>")
    });
 
  });

});

app.listen(port, () => console.log(`Listening on port ${port}`));