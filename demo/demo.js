const readline = require("readline");
const { CFRResource } = require("../config/continuousOptimization");
const { run } = require("jest");

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

// Function to get user input
const question = (query) =>
	new Promise((resolve) => rl.question(query, resolve));

async function createWorkspace(cfr) {
	console.log("\nCreating Workspace:");
	const displayName = await question("Enter workspace display name: ");
	return cfr.createWorkspace(displayName);
}

async function createVehicle(cfr, workspaceId) {
	console.log("\nCreating Vehicle:");
	const displayName = await question("Enter vehicle display name: ");
	const startLatitude = await question("Enter start location latitude: ");
	const startLongitude = await question("Enter start location longitude: ");
	const endLatitude = startLatitude;
	const endLongitude = endLatitude;
	const maxLoad = await question("Enter max load weight: ");

	const vehicleData = {
		displayName,
		startLocation: {
			latitude: parseFloat(startLatitude),
			longitude: parseFloat(startLongitude),
		},
		endLocation: {
			latitude: parseFloat(endLatitude),
			longitude: parseFloat(endLongitude),
		},
		loadLimits: { weight: { maxLoad } },
	};

	return cfr.createVehicle(workspaceId, vehicleData);
}

async function createShipment(cfr, workspaceId) {
	console.log("\nCreating Shipment:");
	const displayName = await question("Enter shipment display name: ");
	const pickupLatitude = await question("Enter pickup location latitude: ");
	const pickupLongitude = await question("Enter pickup location longitude: ");
	const deliveryLatitude = await question("Enter delivery location latitude: ");
	const deliveryLongitude = await question(
		"Enter delivery location longitude: "
	);
	const loadWeight = await question("Enter load weight: ");

	const shipmentData = {
		displayName,
		pickups: [
			{
				arrivalLocation: {
					latitude: parseFloat(pickupLatitude),
					longitude: parseFloat(pickupLongitude),
				},
				duration: "300s",
			},
		],
		deliveries: [
			{
				arrivalLocation: {
					latitude: parseFloat(deliveryLatitude),
					longitude: parseFloat(deliveryLongitude),
				},
				duration: "300s",
			},
		],
		loadDemands: { weight: { amount: loadWeight } },
	};

	return cfr.createShipment(workspaceId, shipmentData);
}

async function createOptimizer(cfr, workspaceId) {
	console.log("\nCreating Optimizer:");
	const displayName = await question("Enter optimizer display name: ");
	const startTime = await question(
		"Enter global start time (YYYY-MM-DDTHH:mm:ssZ): "
	);
	const endTime = await question(
		"Enter global end time (YYYY-MM-DDTHH:mm:ssZ): "
	);

	const optimizerData = {
		displayName,
		modelSpec: { globalStartTime: startTime, globalEndTime: endTime },
		optimizeToursSpec: { timeout: "20s" },
	};

	return cfr.createOptimizer(workspaceId, optimizerData);
}

const cfr = new CFRResource("romodo-fleets");

async function setup() {
	try {
		const workspace = await createWorkspace(cfr);
		console.log("Workspace created:", workspace);
		const workspaceId = workspace.name.split("/").pop();

		for (let i = 0; i < 2; i++) {
			const vehicle = await createVehicle(cfr, workspaceId);
			console.log("Vehicle created:", vehicle);
		}

		for (let i = 0; i < 3; i++) {
			const shipment = await createShipment(cfr, workspaceId);
			console.log(`Shipment ${i + 1} created:`, shipment);
		}

		const optimizer = await createOptimizer(cfr, workspaceId);
		console.log("Optimizer created:", optimizer);

		console.log("Listing optimizers:");
		const optimizers = await cfr.listOptimizers(workspaceId);
		console.log("Optimizers:", optimizers);

		console.log("Waiting for 5 seconds before running the optimizer...");

		await new Promise((resolve) => setTimeout(resolve, 5000));

		const optimizerId = optimizer.name.split("/").pop();
		const optimizationResult = await cfr.runOptimizer(workspaceId, optimizerId);
		console.log("Optimization result:", optimizationResult);
	} catch (error) {
		console.error("An error occurred:", error);
	} finally {
		rl.close();
	}
}

newFunction();
async function newFunction() {
	const option = await question("Enter your option: ");

	switch (option) {
		case "1":
			setup();
			break;
		case "2":
			await cfr.runOptimizer("-3640280689426825215", "2789768862923489281");
			break;
		case "3":
			await cfr.listOptimizers("-3640280689426825215");
			break;
		case "4":
			const operationResult = await cfr.getOperation("s1560286164651343873");
			if (operationResult.done && operationResult.response.solution) {
				const solutionName = operationResult.response.solution;
				const solution = await cfr.getSolution(solutionName);
				console.log("Solution:", solution);

				// The solution object should contain the routes
				if (
					solution.optimizationResponse &&
					solution.optimizationResponse.routes
				) {
					console.log(
						"Routes:",
						JSON.stringify(solution.optimizationResponse.routes)
					);
				} else {
					console.log("No routes found in the solution");
				}
			} else {
				console.log("Operation is not done or does not contain a solution");
			}
			break;
		default:
			console.log("Invalid option");
			break;
	}

	return 0;
}
