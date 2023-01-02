const catchAsyncErrors = require("../middleware/catchAsyncError");

const stripe = require("stripe")(
  "sk_test_51JSZd2SDMIjp98GYahnSHNovmNwMYOO054a1cf9PbbNcgedHNpewc5DO7L3G83YK6E6E4FFERP3KafIXTyOXpNjL00zwOr49Yf"
);

exports.processPayment = catchAsyncErrors(async (req, res) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "Ecommerce",
    },
  });

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

exports.payment = (req, res) => {
  const { token, product } = req.body;
  console.log("product--", product);
  console.log("price---", product.price);
  // eslint-disable-next-line no-undef
  const idempontencyKey = uuid();

  return stripe.customers
    .create({
      email: token,
      source: token.id,
    })
    .then((customer) => {
      // eslint-disable-next-line no-undef
      string.charges.create(
        {
          amount: product.price * 100,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: product.name,
          shipping: {
            name: token.card.name,
            address: {
              country: token.card.address_count,
              // eslint-disable-next-line no-undef
              ry,
            },
          },
        },
        { idempontencyKey }
      );
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log("error", err));
};

exports.sendStripeApiKey = catchAsyncErrors(async (req, res) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});
