export const DurationLimit = {
	$schema: "http://json-schema.org/draft-07/schema#",
	title: "DurationLimit",
	type: "object",
	properties: {
		max_seconds: {
			type: "integer",
			description: "The maximum allowed duration in seconds.",
		},
	},
	required: ["max_seconds"],
};
