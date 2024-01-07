
const db=require('../config/db');
const mongoose =require('mongoose');

const {Schema}=mongoose;

const fileSchema = new Schema({
    _id: false,
    fileType: String,       // E.g., 'audio', 'video', 'pdf', etc.
    fileName: String,       // The original name of the file when uploaded
    filePath: String,       // The path or reference to the stored file
});

const incidentSchema = new Schema({
    crimeNumber:String,
    incidentType: String,
    date: String,
    uploadedFiles:[fileSchema],
    audioLink: String,
    videoLink:String, // For audio link
  
    // uploadedFiles: [String],
    // uploadedFile: String, // You can store the file path or reference here
    description: String,
});

const Incident = mongoose.model('Incident', incidentSchema);

module.exports = Incident;