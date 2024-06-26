export const TimeWindow = {
	$schema: "http://json-schema.org/draft-07/schema#",
	title: "TimeWindow",
	type: "object",
	properties: {
		start_time: {
			type: "string",
			format: "date-time",
			description: "Start time of the time window.",
		},
		end_time: {
			type: "string",
			format: "date-time",
			description: "End time of the time window.",
		},
	},
	required: ["start_time", "end_time"],
};
