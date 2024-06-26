import { Shipment } from "./Shipment";

export const UpdateShipmentRequest = {
	$schema: "http://json-schema.org/draft-07/schema#",
	title: "UpdateShipmentRequest",
	type: "object",
	properties: {
		shipment: Shipment,
		update_mask: {
			type: "string",
			description: "The fields to update.",
		},
	},
	required: ["shipment"],
};
