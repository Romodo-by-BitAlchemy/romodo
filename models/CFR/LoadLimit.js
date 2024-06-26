import { Interval } from "./Interval";

export const LoadLimit = {
	$schema: "http://json-schema.org/draft-07/schema#",
	title: "LoadLimit",
	type: "object",
	properties: {
		intervals: {
			type: "array",
			items: Interval,
			description: "A list of intervals representing the load limits.",
		},
	},
	required: ["intervals"],
};
