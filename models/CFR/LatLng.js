export const LatLng = {
	$schema: "http://json-schema.org/draft-07/schema#",
	title: "LatLng",
	type: "object",
	properties: {
		latitude: {
			type: "number",
			description: "Latitude of the location.",
		},
		longitude: {
			type: "number",
			description: "Longitude of the location.",
		},
	},
	required: ["latitude", "longitude"],
};
