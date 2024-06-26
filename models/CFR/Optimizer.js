export const Optimizer = {
	$schema: "http://json-schema.org/draft-07/schema#",
	title: "Optimizer",
	type: "object",
	properties: {
		name: {
			type: "string",
			description: "The name of the optimizer resource.",
		},
		description: {
			type: "string",
			description: "A description of the optimizer.",
		},
	},
	required: ["name"],
};
