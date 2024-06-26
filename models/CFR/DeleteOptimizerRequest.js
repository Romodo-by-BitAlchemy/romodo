export const DeleteOptimizerRequest = {
	$schema: "http://json-schema.org/draft-07/schema#",
	title: "DeleteOptimizerRequest",
	type: "object",
	properties: {
		name: {
			type: "string",
			description:
				"The name of the optimizer to delete. Format: projects/{project}/locations/{location}/workspaces/{workspace}/optimizers/{optimizer}",
		},
	},
	required: ["name"],
};
