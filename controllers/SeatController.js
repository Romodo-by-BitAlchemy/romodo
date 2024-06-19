const Seat = require("../models/seat");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.selectSeat = async (req, res) => {
  const { seatNumber } = req.body;

  try {
    const seat = await Seat.findOne({ seatNumber: seatNumber });

    if (!seat || seat.isReserved) {
      return res.status(400).send("Seat is not available");
    }

    const price = 1000;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Reservation for seat number: ${seatNumber}`,
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.WEBSITE_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.WEBSITE_URL}/payment-cancelled`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Error in selectSeat:", error);
    res.status(500).send("An error occurred while processing your request.");
  }
};
