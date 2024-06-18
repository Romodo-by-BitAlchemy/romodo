const { FleetRoutingClient } = require("@google-cloud/optimization");

class GoogleCloudService {
	constructor() {
		this.client = new FleetRoutingClient({ fallback: true }); //override gRPC (default) and use REST instead
		//reference: https://github.com/googleapis/gax-nodejs/blob/main/client-libraries.md#http11-rest-api-mode
	}

	async optimizeFleet(routesRequest) {
		try {
			const [response] = await this.client.optimizeTours(routesRequest);
			return response;
		} catch (error) {
			console.error("Error optimizing fleet:", JSON.stringify(error, null, 2)); // Log full error details
			throw error;
		}
	}
}

module.exports = new GoogleCloudService();
