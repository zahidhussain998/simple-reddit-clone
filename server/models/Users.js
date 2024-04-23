
// define the structure of this modle

//make the collection in row form from mongoose


//import mongoose from mongoose libeirary
const mongoose = require("mongoose")

// define the field and collection of data
const schema = new mongoose.Schema({
    author: {type:String,required:true},
    title: {type:String},
    body: {type:String,required:true},
    postedAt: {type:Date,required:true},
    parentId: {type:mongoose.ObjectId,required:false},
    rootId: {type:mongoose.ObjectId,required:false},
  });
  const Comment = mongoose.model('Comment', schema);
  
  export default Comment;