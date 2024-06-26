export const DeleteSolutionRequest = {
	$schema: "http://json-schema.org/draft-07/schema#",
	title: "DeleteSolutionRequest",
	type: "object",
	properties: {
		name: {
			type: "string",
			description:
				"The name of the solution to delete. Format: projects/{project}/locations/{location}/workspaces/{workspace}/solutions/{solution}",
		},
	},
	required: ["name"],
};
