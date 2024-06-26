import { Vehicle } from "./Vehicle";

export const CreateVehicleRequest = {
	$schema: "http://json-schema.org/draft-07/schema#",
	title: "CreateVehicleRequest",
	type: "object",
	properties: {
		parent: {
			type: "string",
			description:
				"The parent resource where this vehicle will be created. Format: projects/{project}/locations/{location}/workspaces/{workspace}",
		},
		vehicle: Vehicle,
		vehicle_id: {
			type: "string",
			description:
				"The ID to use for the vehicle, which will become the final component of the vehicle's resource name. If not provided, an auto-generated ID is used.",
		},
	},
	required: ["parent", "vehicle"],
};
