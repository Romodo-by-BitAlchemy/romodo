export const Visit = {
	$schema: "http://json-schema.org/draft-07/schema#",
	title: "Visit",
	type: "object",
	properties: {
		shipment_id: {
			type: "string",
			description: "The ID of the shipment associated with this visit.",
		},
		arrival_time: {
			type: "string",
			format: "date-time",
			description: "The time when the vehicle arrives at the visit location.",
		},
		departure_time: {
			type: "string",
			format: "date-time",
			description: "The time when the vehicle departs from the visit location.",
		},
	},
	required: ["shipment_id", "arrival_time", "departure_time"],
};
