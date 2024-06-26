export const DeleteShipmentRequest = {
	$schema: "http://json-schema.org/draft-07/schema#",
	title: "DeleteShipmentRequest",
	type: "object",
	properties: {
		name: {
			type: "string",
			description:
				"The name of the shipment to delete. Format: projects/{project}/locations/{location}/workspaces/{workspace}/shipments/{shipment}",
		},
	},
	required: ["name"],
};
