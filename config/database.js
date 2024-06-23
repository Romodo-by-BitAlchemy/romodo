const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.MONGODB_CONN_STRING;

const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

/**
 * Connects to the MongoDB database.
 * @returns {Promise<void>} A promise that resolves when the connection is established.
 */
const connectDB = async () => {
	try {
		await client.connect();
		await client.db("admin").command({ ping: 1 });
		console.log("Successfully connected to the database");
	} catch (error) {
		console.error("Error connecting to the database:", error);
		process.exit(1);
	} finally {
		await client.close();
	}
};

module.exports = connectDB;
connectDB();
