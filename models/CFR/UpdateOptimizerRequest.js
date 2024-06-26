import { Optimizer } from "./Optimizer";

export const UpdateOptimizerRequest = {
	$schema: "http://json-schema.org/draft-07/schema#",
	title: "UpdateOptimizerRequest",
	type: "object",
	properties: {
		optimizer: Optimizer,
		description: "The optimizer to update.",
	},
	update_mask: {
		type: "string",
		description: "The fields to update.",
	},
	required: ["optimizer"],
};
