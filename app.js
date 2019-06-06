const express = require('express');
const app = express();
const port = 1111
const bodyParser = require('body-parser')
const connect = require('./db/connect')
const BlogModel = require('./db/BlogPost');
const User = require('./db/User')
const multer = require('multer')

app.use(express.static('uploads'))

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
var upload = multer({ storage: storage })



app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());

connect()
app.get('/user', (req, res) => {
    var user = new User({
        Name:'jonathan',
        Email:"bemijonathan@gmail.com"
    })
    user.save().then(user => {
        console.log(user)
    })
    res.send({
        hello:"user"
    })
})

app.get('/posts', (req, res) => {
    BlogModel.find({}).sort({ date : -1}).exec().then(x => {
        res.send(x)
    }, err =>{
        console.log(err)
    })
})

app.post('/newPost', upload.single('profileimage'),(req, res) => {

            console.log(req.file.filename)

            if(req.file){
                console.log('Uploading File...');
                var profileimage = req.file.originalname;
            }else{
                console.log("nofile")
            }


    User.findOneAndUpdate({Name:req.body.name}).then(a => {

        if (typeof(a.id) != undefined ){
            
            var newPost = new BlogModel({
                title:  req.body.title,
                author: a.Name,
                body:   req.body.body,
                commentsId: [],
                Image:profileimage
            })

            newPost.save().then(post => {
                console.log("post",post )
                a.BlogPosts.push(post.id)

                a.save().then(user => {
                },err => {
                    console.log('did no add')
                }) 
                res.status(200).send(profileimage)
            },err => {
                res.json.send(err)
            })
        }else{
            res.status(401).send('you must sign up')
        }
    },err => {
        console.log(err)
        res.json.send(err)
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))