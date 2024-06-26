import { AggregatedMetrics } from "./AggregatedMetrics";
import { Visit } from "./Visit";

export const ShipmentRoute = {
	$schema: "http://json-schema.org/draft-07/schema#",
	title: "ShipmentRoute",
	type: "object",
	properties: {
		vehicle_id: {
			type: "string",
			description: "The ID of the vehicle assigned to this route.",
		},
		visits: {
			type: "array",
			items: Visit,
			description: "The sequence of visits that the vehicle makes.",
		},
		metrics: AggregatedMetrics,
	},
	required: ["vehicle_id", "visits"],
};
