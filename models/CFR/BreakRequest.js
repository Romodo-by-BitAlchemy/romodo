export const BreakRequest = {
	$schema: "http://json-schema.org/draft-07/schema#",
	title: "BreakRequest",
	type: "object",
	properties: {
		earliest_start_time: {
			type: "string",
			format: "date-time",
			description: "Lower bound (inclusive) on the start of the break.",
		},
		latest_start_time: {
			type: "string",
			format: "date-time",
			description: "Upper bound (inclusive) on the start of the break.",
		},
		min_duration: {
			type: "string",
			description: "Minimum duration of the break. Must be positive.",
		},
	},
	required: ["earliest_start_time", "latest_start_time", "min_duration"],
};
