const WebSocket = require("ws");

const notifyPassengers = (passengers, users) => {
  passengers.forEach((passenger) => {
    const { name, vehicleNumber } = passenger;
    sendNotification(name, vehicleNumber, users);
  });
};

const sendNotification = (userId, vehicleNumber, users) => {
  const userSocket = users[userId];
  if (userSocket && userSocket.readyState === WebSocket.OPEN) {
    userSocket.send(vehicleNumber);
  }
};

module.exports = { notifyPassengers, sendNotification };
