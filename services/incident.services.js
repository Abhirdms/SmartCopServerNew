const incidentmodel=require('../model/incident');
class IncidentService{
    static async incidentserve(crimeNumber,incidentType,date,audioLink,videoLink,description, uploadedFiles,req){
        try{
            // const createincdata=new incidentmodel({incidentType,description});
            // return await createincdata.save();
            // const filePaths = uploadedFiles.map(file => file.path);
            console.log('Creating incident data:', { crimeNumber,incidentType, date,audioLink,videoLink,description,uploadedFiles });
            const filesToSave = uploadedFiles.map(file => ({
                fileType: file.fileType,
                fileName: file.name,
                filePath: file.path,
            }));
            
            // const createincdata = new incidentmodel({  crimeNumber,incidentType,date,description,uploadedFiles: filePaths, });
            // const createincdata = new incidentmodel({  crimeNumber,incidentType,date,description, uploadedFiles:[
            //     {
            //       fileType: req.body.uploadedFiles[0].fileType,
                
            //       fileName: req.body.uploadedFiles[0].name,
            //       filePath: req.body.uploadedFiles[0].path,
            //     },
            //   ],});
            const createincdata = new incidentmodel({
                crimeNumber,
                incidentType,
                date,
                audioLink,
                videoLink,
                description,
                uploadedFiles: filesToSave,
            });

            console.log('Incident data before save:', createincdata);

            const savedIncident = await createincdata.save();
            console.log('Incident data after save:', savedIncident);
            return savedIncident;

        }catch(err){
            console.error("Error in incident service:", err);
            throw new Error("Failed to create incident");
        }

    }

}
module.exports=IncidentService;