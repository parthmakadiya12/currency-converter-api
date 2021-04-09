import getConversionRates from "../utils/conversionalRateUtil";

const conversionReqValidator = async (req, res, next) => {
  const from = req.query.from;
  const to = req.query.to;
  const amount = req.query.amount;
  const result = await getConversionRates();
  const keys = Object.keys(result);
  req.currentRates = result;
  try {
    validateCountry(from, keys);
    validateCountry(to, keys);
    if (isNaN(amount)) {
      throw new Error("Given value is not a number " + amount);
    }
    next();
  } catch (e) {
    res.status(416).send({
      error: e.message,
    });
  }
};

function validateCountry(country, keys) {
  const isValid = keys.includes(country);
  if (!isValid) {
    throw new Error("Given " + country + " value is not valid");
  }
  return isValid;
}

export default conversionReqValidator;
