const Joi = require("joi");
const { Workspace } = require("../models/CFR/Workspace");
const { Vehicle } = require("../models/CFR/Vehicle");
const { Shipment } = require("../models/CFR/Shipment");
const { Optimizer } = require("../models/CFR/Optimizer");

const validateWorkspaceCreation = (req, res, next) => {
	const { error } = Workspace.validate(req.body);
	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}
	next();
};

const validateVehicleCreation = (req, res, next) => {
	const { error } = Vehicle.validate(req.body);
	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}
	next();
};

const validateShipmentCreation = (req, res, next) => {
	const { error } = Shipment.validate(req.body);
	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}
	next();
};

const validateOptimizerCreation = (req, res, next) => {
	const { error } = Optimizer.validate(req.body);
	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}
	next();
};

const validateShipmentUpdate = (req, res, next) => {
	const { error } = Shipment.validate(req.body, { allowUnknown: true });
	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}
	next();
};

const validateOptimizerUpdate = (req, res, next) => {
	const { error } = Optimizer.validate(req.body, { allowUnknown: true });
	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}
	next();
};

module.exports = {
	validateWorkspaceCreation,
	validateVehicleCreation,
	validateShipmentCreation,
	validateOptimizerCreation,
	validateShipmentUpdate,
	validateOptimizerUpdate,
};
