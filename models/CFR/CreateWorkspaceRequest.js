import { Workspace } from "./Workspace";

export const CreateWorkspaceRequest = {
	$schema: "http://json-schema.org/draft-07/schema#",
	title: "CreateWorkspaceRequest",
	type: "object",
	properties: {
		parent: {
			type: "string",
			description:
				"The parent resource where this workspace will be created. Format: projects/{project}/locations/{location}",
		},
		workspace: Workspace,
		workspace_id: {
			type: "string",
			description:
				"The ID to use for the workspace, which will become the final component of the workspace's resource name. If not provided, an auto-generated ID is used.",
		},
	},
	required: ["parent", "workspace"],
};
