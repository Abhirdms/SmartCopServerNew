
const Report = require('../model/nakabandireport');

exports.createOrUpdateReport = async (selectedDate, policeStation, locationName, selectedUsers) => {
  try {
    // Find or create a report for the given date
    let report = await Report.findOne({ selectedDate });

    if (!report) {
      // If report doesn't exist for the selected date, create a new one
      report = new Report({
        selectedDate,
        policeStations: [{
          policeStation,
          locations: [{ cases: {}, selectedUsers, nakabandispotname: locationName }]
        }]
      });
    } else {
      const existingPoliceStation = report.policeStations.find(station => station.policeStation === policeStation);

      if (existingPoliceStation) {
        // If the police station exists, append the location to its locations array
        existingPoliceStation.locations.push({ cases: {}, selectedUsers, nakabandispotname: locationName });
      } else {
        // If the police station doesn't exist, create a new entry for it
        report.policeStations.push({
          policeStation,
          locations: [{ cases: {}, selectedUsers, nakabandispotname: locationName }]
        });
      }
    }

    // Save the updated or new report
    await report.save();

    // Logging success message
    console.log('Nakabandi allotment saved successfully.');
  } catch (error) {
    // Handle error
    console.error('Error saving nakabandi allotment:', error);
    throw new Error('An error occurred while saving nakabandi allotment.');
  }
};
