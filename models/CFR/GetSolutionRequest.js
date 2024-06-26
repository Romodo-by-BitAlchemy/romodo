export const GetSolutionRequest = {
	$schema: "http://json-schema.org/draft-07/schema#",
	title: "GetSolutionRequest",
	type: "object",
	properties: {
		name: {
			type: "string",
			description:
				"The name of the solution to retrieve. Format: projects/{project}/locations/{location}/workspaces/{workspace}/solutions/{solution}",
		},
	},
	required: ["name"],
};
