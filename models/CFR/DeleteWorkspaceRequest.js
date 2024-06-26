export const DeleteWorkspaceRequest = {
	$schema: "http://json-schema.org/draft-07/schema#",
	title: "DeleteWorkspaceRequest",
	type: "object",
	properties: {
		name: {
			type: "string",
			description:
				"The name of the workspace to delete. Format: projects/{project}/locations/{location}/workspaces/{workspace}",
		},
	},
	required: ["name"],
};
