import express from "express";
import { addQuoteInfo } from "../models/insertQuotes.js";
import { finalPrice } from "../models/calculateQuote.js";
import { getCount } from "../models/countTodayQuotes.js";

import fetch from "node-fetch";
const router = express.Router();

// Quote counter
router.get("/", async function (req, res) {
  const result = await getCount();
  res.json({ success: true, payload: result });
});

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

//Breed validation
router.use(async function (req, res, next) {
  const breed = req.body.pets[0].breed;
  const response = await fetch(`https://dog.ceo/api/breed/${breed}/images
  `);
  const data = await response.json();
  if (data.message === "Breed not found (master breed does not exist)") {
    res.status(404).json({ message: "This is not a dog breed 😞" });
  } else {
    next();
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
