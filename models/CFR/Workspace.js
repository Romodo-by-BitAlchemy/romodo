const Workspace = {
	$schema: "http://json-schema.org/draft-07/schema#",
	title: "Workspace",
	type: "object",
	properties: {
		id: {
			type: "string",
			description: "Unique identifier for the workspace.",
		},
		name: {
			type: "string",
			description: "Name of the workspace.",
		},
		description: {
			type: "string",
			description: "Description of the workspace.",
		},
	},
	required: ["id", "name"],
};

module.exports = Workspace;
