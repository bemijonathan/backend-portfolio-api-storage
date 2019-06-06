var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
  title:  String,
  author: String,
  body:   String,
  commentsId: [{
      type:String
  }],
  Image:String,
  date: { type: Date, default: Date.now },
  hidden: {
      type:Boolean,
      default:false
  }
});


var Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog