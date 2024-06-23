const { CFRResource } = require("./continuousOptimization");

(async () => {
	const resourceManager = new CFRResource();

	try {
		// Create a new workspace
		const workspaceResponse = await resourceManager.createWorkspace(
			"workspace-1"
		);
		const workspaceId = workspaceResponse.name.split("/").pop(); // Extract the workspace ID

		console.log("Workspace ID:", workspaceId);

		// Create a shipment using the workspace ID
		const shipmentData = {
			displayName: "shipment-1",
			// Add other necessary shipment details
		};
		await resourceManager.createShipment(workspaceId, shipmentData);

		// Create a vehicle using the workspace ID
		const vehicleData = {
			displayName: "vehicle-1",
			// Add other necessary vehicle details
		};
		await resourceManager.createVehicle(workspaceId, vehicleData);
	} catch (error) {
		console.error("An error occurred:", error);
	}
})();

//########################################################################################################################3
// const CFR = require("./continuousOptimization");

// const resource = new CFR.CFRResource();
// resource.createWorkspace("test-workspace");

// const workplace = JSON.parse(resource);

// resource.createShipment(
// 	{ workspaceId: workplace.name },
// 	{
// 		shipments: [
// 			{
// 				deliveries: [
// 					{
// 						arrivalLocation: {
// 							latitude: 48.880942,
// 							longitude: 2.323866,
// 						},
// 						duration: "250s",
// 						timeWindows: [
// 							{
// 								endTime: "1970-01-01T01:06:40Z",
// 								startTime: "1970-01-01T00:50:00Z",
// 							},
// 						],
// 					},
// 				],
// 				loadDemands: {
// 					weight: {
// 						amount: "10",
// 					},
// 				},
// 				pickups: [
// 					{
// 						arrivalLocation: {
// 							latitude: 48.874507,
// 							longitude: 2.30361,
// 						},
// 						duration: "150s",
// 						timeWindows: [
// 							{
// 								endTime: "1970-01-01T00:33:20Z",
// 								startTime: "1970-01-01T00:16:40Z",
// 							},
// 						],
// 					},
// 				],
// 			},
// 			{
// 				deliveries: [
// 					{
// 						arrivalLocation: {
// 							latitude: 48.88094,
// 							longitude: 2.323844,
// 						},
// 						duration: "251s",
// 						timeWindows: [
// 							{
// 								endTime: "1970-01-01T01:06:41Z",
// 								startTime: "1970-01-01T00:50:01Z",
// 							},
// 						],
// 					},
// 				],
// 				loadDemands: {
// 					weight: {
// 						amount: "20",
// 					},
// 				},
// 				pickups: [
// 					{
// 						arrivalLocation: {
// 							latitude: 48.874507,
// 							longitude: 2.30361,
// 						},
// 						duration: "150s",
// 						timeWindows: [
// 							{
// 								endTime: "1970-01-01T00:33:20Z",
// 								startTime: "1970-01-01T00:16:40Z",
// 							},
// 						],
// 					},
// 				],
// 			},
// 		],
// 	}
// );

// resource.createVehicle("test-workspace", { name: "vehicle-1" });
