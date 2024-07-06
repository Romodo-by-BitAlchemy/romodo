const Issue = require('../model/issues');
const { handleRerouting } = require('../services/reroutingService');

exports.createIssue = async (req, res) => {
  try {
    const { incidentType, type, description, rerouting, reroutingNewVehicleNo, reroutingNewDriverNo } = req.body;

    // If rerouting is true, handle rerouting and do not save the issue in the database
    if (rerouting) {
      const reroutingIssue = {
        incidentType,
        type,
        description,
        rerouting,
        reroutingNewVehicleNo,
        reroutingNewDriverNo,
      };
      handleRerouting(reroutingIssue);
      return res.status(200).json({ message: 'Rerouting handled successfully', issue: reroutingIssue });
    }

    // If rerouting is false, save the issue in the database
    const newIssue = new Issue({
      incidentType,
      type,
      description,
      rerouting,
      reroutingNewVehicleNo: null,
      reroutingNewDriverNo: null,
    });

    await newIssue.save();

    res.status(201).json({ message: 'Issue created successfully', issue: newIssue });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create issue', error: error.message });
  }
};























   
