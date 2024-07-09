var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

var logger = require("morgan");
const cors = require("cors");


var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var fleetRoutingRoutes = require("./routes/fleetRouting");

const WebSocket = require("ws");
const http = require("http");
const { notifyPassengers, handleNotification } = require("./services/notificationService");
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const users = {}



wss.on("connection", (ws, req) => {
	const userId = req.url.split("/").pop(); 
	users[userId] = ws;
  
	ws.on("message", (message) => {
	  console.log(`Received message: ${message} from user: ${userId}`);
	});
  
	ws.on("close", () => {
	  delete users[userId];
	});
  });



var app = express();

app.use(cors({ origin: "*" }));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/fleet", fleetRoutingRoutes);

const PORT = process.env.PORT || 3000;


// Start the server and keep it running
app.listen(PORT, function () {
	console.log(`Server is running on port ${PORT}`);
});
