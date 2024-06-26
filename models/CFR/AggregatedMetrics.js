export const AggregatedMetrics = {
	$schema: "http://json-schema.org/draft-07/schema#",
	title: "AggregatedMetrics",
	type: "object",
	properties: {
		total_cost: {
			type: "number",
			description: "The total cost of the solution.",
		},
		total_distance_meters: {
			type: "number",
			description: "The total distance traveled by all vehicles, in meters.",
		},
		total_duration_seconds: {
			type: "number",
			description: "The total duration of all vehicle routes, in seconds.",
		},
	},
};
