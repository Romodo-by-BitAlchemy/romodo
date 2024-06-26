export const DeleteVehicleRequest = {
	$schema: "http://json-schema.org/draft-07/schema#",
	title: "DeleteVehicleRequest",
	type: "object",
	properties: {
		name: {
			type: "string",
			description:
				"The name of the vehicle to delete. Format: projects/{project}/locations/{location}/workspaces/{workspace}/vehicles/{vehicle}",
		},
	},
	required: ["name"],
};
