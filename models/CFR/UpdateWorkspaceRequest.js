import { Workspace } from "./Workspace";

export const UpdateWorkspaceRequest = {
	$schema: "http://json-schema.org/draft-07/schema#",
	title: "UpdateWorkspaceRequest",
	type: "object",
	properties: {
		workspace: Workspace,
		update_mask: {
			type: "string",
			description: "The fields to update.",
		},
	},
	required: ["workspace"],
};
