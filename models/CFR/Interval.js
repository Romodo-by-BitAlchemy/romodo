export const Interval = {
	$schema: "http://json-schema.org/draft-07/schema#",
	title: "Interval",
	type: "object",
	properties: {
		min_value: {
			type: "integer",
			description: "The minimum value of the interval.",
		},
		max_value: {
			type: "integer",
			description: "The maximum value of the interval.",
		},
	},
	required: ["min_value", "max_value"],
};
