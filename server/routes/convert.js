import express from "express";

const router = express.Router();

/* GET convert get listing. */
router.get("/", async (req, res, next) => {
  const { from, to, amount } = req.query;
  const rates = calculate(from, to, amount, req.currentRates);
  res.json({
    amount: amount,
    from: from,
    to: to,
    rate: rates,
    date: new Date(),
  });
});

function calculate(from, to, amt, currentRates) {
  let result;
  if (from === "EUR") {
    result = amt * currentRates[to];
  } else if (to === "EUR") {
    result = amt / currentRates[to];
  } else {
    result = amt * (currentRates[to] / currentRates[from]);
  }
  return result;
}
export default router;
