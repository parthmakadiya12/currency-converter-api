import express from "express";

const router = express.Router();

/* GET convert get listing. */
router.get("/", async (req, res, next) => {
  const { from, to, amount } = req.query;
  const totalSum = calculate(from, to, amount, req.currentRates);
  const rate = calculate(from, to, 1, req.currentRates);

  res.status(200).send({
    amount: amount,
    from: from,
    to: to,
    total: totalSum,
    rate: rate,
    date: new Date(),
  });
});

function calculate(from, to, amt, currentRates) {
  let result;
  if (from === "EUR") {
    result = amt * currentRates[to];
  } else if (to === "EUR") {
    result = amt / currentRates[from];
  } else {
    result = amt * (currentRates[to] / currentRates[from]);
  }
  return result;
}
export default router;
