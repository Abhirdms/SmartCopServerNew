const IncidentService=require("../services/incident.services");

exports.incident = async(req,res,next)=>{
    try{
        const {crimeNumber,incidentType,date,audioLink,videoLink,description}=req.body;
        console.log(incidentType)
        console.log('Received incident data:', crimeNumber,incidentType,date,audioLink,videoLink,description);
        const uploadedFiles = req.body.uploadedFiles;
        const successRes=await IncidentService.incidentserve(crimeNumber,incidentType,date,audioLink,videoLink,description,uploadedFiles,req);
        res.json({status:true,success:"incident"})


    }catch(error){
        console.log(error)

    }
}