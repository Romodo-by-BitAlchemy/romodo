import { Shipment } from "./Shipment";

export const CreateShipmentRequest = {
	$schema: "http://json-schema.org/draft-07/schema#",
	title: "CreateShipmentRequest",
	type: "object",
	properties: {
		parent: {
			type: "string",
			description:
				"The parent resource where this shipment will be created. Format: projects/{project}/locations/{location}/workspaces/{workspace}",
		},
		shipment: Shipment,
		shipment_id: {
			type: "string",
			description:
				"The ID to use for the shipment, which will become the final component of the shipment's resource name. If not provided, an auto-generated ID is used.",
		},
	},
	required: ["parent", "shipment"],
};
