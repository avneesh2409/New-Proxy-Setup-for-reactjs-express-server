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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.get('/api/hello', (req, res) => {
  User.findAll().then(users => {
    console.log("All users:")
    res.write("<table border='1' style='border-collapse:collapse'><tr><th>id</th><th>number</th><th>token</th><th>image</th><th>createdAt</th><th>updatedAt</th></tr>")
    users.map(e => {
      console.log(e.dataValues)
      res.write("<tr><td>" + e.dataValues['id'] + "</td><td>" + e.dataValues['number'] + "</td><td>" + e.dataValues['token'] + "</td><td>" + e.dataValues['image_uploaded'] + "</td><td>" + e.dataValues['createdAt'] + "</td><td>" + e.dataValues['updatedAt'] + "</td></tr>")
    })
    res.write("</table>")
    res.end()
  })
});
app.post('/api/login', (req, res) => {
  console.log(req.body)
  User.findAll().then(users => {
    users.map(e => {
      if (e.number == req.body.username && e.token == req.body.password) {
         res.render('index',{user:e})
      }
    })
  })

})
app.post('/api/world', (req, res) => {
  //---------------------Image Uploaded-----------------------//

  const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: function (req, file, cb) {
      cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
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
      image_uploaded: req.file.path
    }
    User.create(data).then(jane => {
      console.log("auto-generated ID:" + jane.id);
    });
    if (!err)
      return res.sendStatus(200).end();
  });

});

app.listen(port, () => console.log(`Listening on port ${port}`));