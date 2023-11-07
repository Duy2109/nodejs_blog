const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-updater');
const mongooseDelete= require('mongoose-delete');



const Course = new Schema({
    name: { type: String , required:true,},
    description: { type: String },
    image:{type: String},
    slug:{type: String, slug:'name',Unique:true},
    videoId:{type: String, required:true,},
    level:{type: String},
},{
    timestamps:true
});

//add plugin
mongoose.plugin(slug);
Course.plugin(mongooseDelete,{
    deletedAt:true,
    overrideMethods:'all'});

module.exports =mongoose.model('Course',Course);