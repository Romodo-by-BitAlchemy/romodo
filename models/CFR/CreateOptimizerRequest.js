import { Optimizer } from "./Optimizer";

export const CreateOptimizerRequest = {
	$schema: "http://json-schema.org/draft-07/schema#",
	title: "CreateOptimizerRequest",
	type: "object",
	properties: {
		parent: {
			type: "string",
			description:
				"The parent resource where this optimizer will be created. Format: projects/{project}/locations/{location}/workspaces/{workspace}",
		},
		optimizer: Optimizer,
		optimizer_id: {
			type: "string",
			description:
				"The ID to use for the optimizer, which will become the final component of the optimizer's resource name. If not provided, an auto-generated ID is used.",
		},
	},
	required: ["parent", "optimizer"],
};
