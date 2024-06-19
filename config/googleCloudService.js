const axios = require("axios");
const { execSync } = require("child_process");
const { send } = require("process");

const exampleRequest = {
	parent: "projects/romodo-fleets",
	model: {
		shipments: [
			{
				deliveries: [
					{
						arrivalLocation: {
							latitude: 48.880942,
							longitude: 2.323866,
						},
						duration: "250s",
						timeWindows: [
							{
								endTime: "1970-01-01T01:06:40Z",
								startTime: "1970-01-01T00:50:00Z",
							},
						],
					},
				],
				loadDemands: {
					weight: {
						amount: "10",
					},
				},
				pickups: [
					{
						arrivalLocation: {
							latitude: 48.874507,
							longitude: 2.30361,
						},
						duration: "150s",
						timeWindows: [
							{
								endTime: "1970-01-01T00:33:20Z",
								startTime: "1970-01-01T00:16:40Z",
							},
						],
					},
				],
			},
			{
				deliveries: [
					{
						arrivalLocation: {
							latitude: 48.88094,
							longitude: 2.323844,
						},
						duration: "251s",
						timeWindows: [
							{
								endTime: "1970-01-01T01:06:41Z",
								startTime: "1970-01-01T00:50:01Z",
							},
						],
					},
				],
				loadDemands: {
					weight: {
						amount: "60",
					},
				},
				pickups: [
					{
						arrivalLocation: {
							latitude: 48.880943,
							longitude: 2.323867,
						},
						duration: "151s",
						timeWindows: [
							{
								endTime: "1970-01-01T00:33:21Z",
								startTime: "1970-01-01T00:16:41Z",
							},
						],
					},
				],
			},
		],
		vehicles: [
			{
				loadLimits: {
					weight: {
						maxLoad: 50,
					},
				},
				endLocation: {
					latitude: 48.86311,
					longitude: 2.341205,
				},
				startLocation: {
					latitude: 48.863102,
					longitude: 2.341204,
				},
			},
			{
				loadLimits: {
					weight: {
						maxLoad: 60,
					},
				},
				endLocation: {
					latitude: 48.86312,
					longitude: 2.341215,
				},
				startLocation: {
					latitude: 48.863112,
					longitude: 2.341214,
				},
			},
		],
	},
};

class GoogleCloudService {
	constructor() {
		// Read the JSON data from the file
		this.requestData = exampleRequest;

		// Get the access token using gcloud command
		this.accessToken = execSync("gcloud auth print-access-token")
			.toString()
			.trim();

		// Define the headers
		this.headers = {
			Authorization: `Bearer ${this.accessToken}`,
			"x-goog-user-project": "romodo-fleets",
			"Content-Type": "application/json; charset=utf-8",
		};
	}

	async makePostRequest(incomingRequest) {
		try {
			const response = await axios.post(
				"https://cloudoptimization.googleapis.com/v1/projects/romodo-fleets:optimizeTours",
				incomingRequest || this.requestData,
				{ headers: this.headers }
			);
			return response.data;
		} catch (error) {
			throw error.response ? error.response.data : error.message;
		}
	}
}

module.exports = new GoogleCloudService();
