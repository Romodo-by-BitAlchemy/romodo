import { Location } from "./Location.js";

export const Shipment = {
	$schema: "http://json-schema.org/draft-07/schema#",
	title: "Shipment",
	type: "object",
	properties: {
		id: {
			type: "string",
			description: "Unique identifier for the shipment.",
		},
		description: {
			type: "string",
			description: "Description of the shipment.",
		},
		pickup_location: Location,
		delivery_location: Location,
		pickup_time: {
			type: "string",
			format: "date-time",
			description: "Pickup time for the shipment.",
		},
		delivery_time: {
			type: "string",
			format: "date-time",
			description: "Delivery time for the shipment.",
		},
		weight: {
			type: "number",
			description: "Weight of the shipment.",
		},
		volume: {
			type: "number",
			description: "Volume of the shipment.",
		},
	},
	required: [
		"id",
		"pickup_location",
		"delivery_location",
		"pickup_time",
		"delivery_time",
	],
};
