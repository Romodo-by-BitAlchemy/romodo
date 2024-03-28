// __tests__/allocation.test.js

const { allocatePassenger, routes } = require("../src/allocation");

describe("Passenger Allocation", () => {
	test("allocates a passenger to the correct route based on endLocation", () => {
		const passengerName = "John Doe";
		const dropOffLocation = "Downtown";
		const result = allocatePassenger(passengerName, dropOffLocation);

		expect(result.success).toBe(true);
		expect(result.route.passengers).toContain(passengerName);
		expect(result.route.endLocation).toBe(dropOffLocation);
	});

	test("fails to allocate a passenger to a non-existent route", () => {
		const result = allocatePassenger("Jane Doe", "Nowhere Land");
		expect(result.success).toBe(false);
		expect(result.message).toBe(
			"No route found for the given drop-off location."
		);
	});

	test("allocates a passenger and assigns a vehicle to the route", () => {
		const passengerName = "Alice Smith";
		const dropOffLocation = "Suburb";
		const result = allocatePassenger(passengerName, dropOffLocation);

		expect(result.success).toBe(true);
		expect(result.route.passengers).toContain(passengerName);
		expect(result.route.endLocation).toBe(dropOffLocation);
		expect(result.route.vehicle).toBeDefined();
		expect(result.route.vehicle).toMatch(/Vehicle for Suburb/);
	});
});
