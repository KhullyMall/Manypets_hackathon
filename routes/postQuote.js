import express from "express";
import { addQuoteInfo } from "../models/insertQuotes.js";
import { finalPrice } from "../models/calculateQuote.js";
import fetch from "node-fetch";
const router = express.Router();

//Postcode Validation
router.use(async function (req, res, next) {
  const postcode = req.body.pets[0].postcode;
  const response = await fetch(
    `https://api.postcodes.io/postcodes/${postcode}/validate`
  );
  const data = await response.json();
  if (data.result === true) {
    next();
  } else {
    res.status(404).json({ message: "We couldn't find your address 😞" });
  }
});

router.post("/", async function (req, res) {
  const quoteData = req.body.pets;
  const todaysDate = new Date();
  try {
    const quotePrice = finalPrice(quoteData);
    const response = await addQuoteInfo(quoteData, quotePrice, todaysDate);
    res.json({ success: true, payload: response });
  } catch (err) {
    res.json({ success: false, code: 501, message: "Could not find a quote" });
    console.log(err);
  }
  /*
    - Try to post the quote to the database
    - 
    */
});

export default router;
