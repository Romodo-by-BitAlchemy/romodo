import { FieldViolation } from "./FieldViolation";

export const BadRequest = {
	$schema: "http://json-schema.org/draft-07/schema#",
	title: "BadRequest",
	type: "object",
	properties: {
		field_violations: {
			type: "array",
			items: FieldViolation,
			description: "Describes all violations in a client request.",
		},
	},
};
