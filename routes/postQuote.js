import express from "express";
import { addQuoteInfo } from '../models/insertQuotes.js';
import { finalPrice } from '../models/calculateQuote.js';
const router = express.Router();

router.post("/", async function (req, res) {
    const quoteData = req.body.pets;
    const todaysDate = new Date();
    try {
        const quotePrice = finalPrice(quoteData);
        const response = await addQuoteInfo(quoteData, quotePrice, todaysDate);
        res.json({success: true, payload: response});
    } catch (err) {
        res.json({success: false, code: 501, message: "Could not find a quote"});
        console.log(err);
    }
    /*
    - Try to post the quote to the database
    - 
    */
    
});
  
export default router;
  