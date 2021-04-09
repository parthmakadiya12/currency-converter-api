import express from "express";
import getConversionRates from "../utils/conversionalRateUtil";

const router = express.Router();

/* GET convert get listing. */
router.get("/", async (req, res, next) => {
  const result = await getConversionRates();
  console.log("RESULT", result);
  res.json(result);
});

export default router;
