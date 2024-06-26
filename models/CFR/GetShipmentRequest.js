export const GetShipmentRequest = {
	$schema: "http://json-schema.org/draft-07/schema#",
	title: "GetShipmentRequest",
	type: "object",
	properties: {
		name: {
			type: "string",
			description:
				"The name of the shipment to retrieve. Format: projects/{project}/locations/{location}/workspaces/{workspace}/shipments/{shipment}",
		},
	},
	required: ["name"],
};
