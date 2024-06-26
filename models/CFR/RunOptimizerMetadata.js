export const RunOptimizerMetadata = {
	$schema: "http://json-schema.org/draft-07/schema#",
	title: "RunOptimizerMetadata",
	type: "object",
	properties: {
		state: {
			type: "string",
			description: "The state of the current operation.",
		},
		state_message: {
			type: "string",
			description:
				"A message providing more details about the current state of the operation.",
		},
	},
};
