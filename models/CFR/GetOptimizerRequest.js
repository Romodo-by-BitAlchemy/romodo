export const GetOptimizerRequest = {
	$schema: "http://json-schema.org/draft-07/schema#",
	title: "GetOptimizerRequest",
	type: "object",
	properties: {
		name: {
			type: "string",
			description:
				"The name of the optimizer to retrieve. Format: projects/{project}/locations/{location}/workspaces/{workspace}/optimizers/{optimizer}",
		},
	},
	required: ["name"],
};
