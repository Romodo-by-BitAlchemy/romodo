export const FieldViolation = {
	$schema: "http://json-schema.org/draft-07/schema#",
	title: "FieldViolation",
	type: "object",
	properties: {
		field: {
			type: "string",
			description: "A path leading to a field in the request body.",
		},
		description: {
			type: "string",
			description: "A description of why the request is bad.",
		},
	},
	required: ["field", "description"],
};
