var mongoose = require('mongoose');

var Schema = mongoose.Schema;

let Userschema = new Schema({
    Name:String,
    Email:String,
    image:String,
    BlogPosts:[{type:String}],
    Comments:[{type:String}]
})

let User = mongoose.model('User', Userschema)
module.exports = User