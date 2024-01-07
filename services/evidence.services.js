const Evidence=require('../model/evidence');
class EvidenceService{
    static async evidenceserve(policeStation, crimeNumber, selectedIncidentTypes,audioLink,videoLink,description,uploadedFiles){
        try{
            // const createincdata=new incidentmodel({incidentType,description});
            // return await createincdata.save();
            const filePaths = uploadedFiles.map(file => file.path);
            console.log('Creating incident data:', { policeStation, crimeNumber,selectedIncidentTypes,audioLink,videoLink,description,uploadedFiles });
            
            const createEvidenceData = new Evidence({ policeStation, crimeNumber, selectedIncidentTypes,audioLink,videoLink,description,uploadedFiles: filePaths });
            console.log('Incident data before save:', createEvidenceData);

            const savedEvidence = await createEvidenceData.save();
            console.log('Incident data after save:', savedEvidence);

            return savedEvidence;

        }catch(err){
            console.error("Error in incident service:", err);
            throw new Error("Failed to create incident");
        }

    }

}
module.exports=EvidenceService;