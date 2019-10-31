const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

//-----------------------------------------------------------//
var formidable = require('formidable')
var fs = require('fs');
const User = require('./models/model')
//-----------------------------------------------------------//

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  //-----------------------------------------------------------------//
  // var form = new formidable.IncomingForm();
  // form.parse(req, function (err, fields, files) {
  //   if (err) { throw (err) }
  //   console.log(fields)
  //   console.log(files.filetoupload.name)
  // })
  // var oldpath = req.body.file;
  // var newpath = 'uploads/' + Math.floor(Math.random() * 1000) + "_" + req.body.file;
  // let data = {
  //   number: fields.number,
  //   token: fields.token,
  //   image_uploaded: newpath
  // }
  // User.create(data).then(jane => {
  //   console.log("auto-generated ID:" + jane.id);
  // });
  // fs.rename(oldpath, newpath, function (err) {
  //   if (err) throw err;
  // });
  //-----------------------------------------------------------------//
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}--->${req.body.username}--->${req.body.password}--->${req.body.file}`,
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));