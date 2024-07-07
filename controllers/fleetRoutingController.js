const googleCloudService = require("../config/googleCloudService");

const optimizeFleet = async (req, res) => {
	try {
		const routesRequest = req.body;
		const result = await googleCloudService.makePostRequest(routesRequest);
		res.status(200).json(result);
	} catch (error) {
		res.status(500).json({ message: "Error optimizing fleet", error });
	}
};

module.exports = {
	optimizeFleet,
};
