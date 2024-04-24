const express = require('express');
const { selectSeat, processPayment } = require('../controllers/seatController');
const { isAuthenticatedUser } = require('../middleware/authMiddleware');
const router = express.Router();


router.post('/select-seat', isAuthenticatedUser, selectSeat);

module.exports = router;
