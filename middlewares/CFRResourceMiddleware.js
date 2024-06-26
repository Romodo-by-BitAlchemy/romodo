const { CFRResource } = require("../config/continuousOptimization");
var logger = require("utils/logger");

const setUpResourceManager = (req, _res, next) => {
	const { projectId } = req.params;
	req.resourceManager = new CFRResource();
	next();
};

const extractWorkspaceId = (req, _res, next) => {
	req.workspaceId = req.params.workspaceId;
	next();
};

const extractShipmentId = (req, _res, next) => {
	req.shipmentId = req.params.shipmentId;
	next();
};

const extractVehicleId = (req, _res, next) => {
	req.vehicleId = req.params.vehicleId;
	next();
};

module.exports = {
	setUpResourceManager,
	extractWorkspaceId,
	extractShipmentId,
	extractVehicleId,
};
