
const db=require('../config/db');
const mongoose =require('mongoose');

const {Schema}=mongoose;

const fileSchema = new Schema({
    fileType: String,       // E.g., 'audio', 'video', 'pdf', etc.
    fileName: String,       // The original name of the file when uploaded
    filePath: String,       // The path or reference to the stored file
});

const evidenceSchema = new Schema({
    
    // date: Date,
    policeStation:String,
     crimeNumber:String,
     selectedIncidentTypes:[String],
     audioLink:String,
     videoLink:String,
     uploadedFiles: [String],
     description: String,
    // uploadedFile: String, // You can store the file path or reference here
    
});

const Evidence = mongoose.model('Evidence', evidenceSchema);

module.exports = Evidence;