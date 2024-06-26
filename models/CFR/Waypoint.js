export const Waypoint = {
	$schema: "http://json-schema.org/draft-07/schema#",
	title: "Waypoint",
	type: "object",
	properties: {
		location: {
			$ref: "./Location",
			description: "The geographic location of the waypoint.",
		},
		description: {
			type: "string",
			description: "Description of the waypoint.",
		},
	},
	required: ["location"],
};
