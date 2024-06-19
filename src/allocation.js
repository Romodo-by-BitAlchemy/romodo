// src/allocation.js

class Route {
	constructor(date, time, endLocation) {
		this.date = date;
		this.time = time;
		this.endLocation = endLocation;
		this.passengers = []; // Keep track of passengers
		this.vehicle = null; // Assigned vehicle
	}

	addPassenger(passenger) {
		this.passengers.push(passenger);
	}

	assignVehicle(vehicle) {
		this.vehicle = vehicle;
	}
}

// Example usage with a few predefined routes
const routes = [
	new Route(new Date(2024, 3, 10), "08:00", "Downtown"),
	new Route(new Date(2024, 3, 10), "09:00", "Uptown"),
];

/**
 * Function to allocate a passenger based on their drop-off location.
 * This function would need to be expanded to account for date and time for a real application.
 */
const allocatePassenger = (name, dropOffLocation) => {
	const route = routes.find((route) => route.endLocation === dropOffLocation);
	if (route) {
		route.addPassenger(name);
		// Placeholder vehicle assignment for demonstration
		route.assignVehicle("Vehicle for " + route.endLocation);
		return { success: true, route: route };
	}
	return {
		success: false,
		message: "No route found for the given drop-off location.",
	};
};

module.exports = { allocatePassenger, routes };
