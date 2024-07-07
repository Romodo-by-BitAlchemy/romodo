const { LatLng } = require("./LatLng");

const Location = {
	$schema: "http://json-schema.org/draft-07/schema#",
	title: "Location",
	type: "object",
	properties: {
		lat_lng: LatLng,
		heading: {
			type: "integer",
			description:
				"The compass heading associated with the direction of the flow of traffic.",
		},
	},
	required: ["lat_lng"],
};

module.exports = Location;
