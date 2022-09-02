import express from "express";
const router = express.Router();

router.post("/", function (req, res) {
    const quoteData = req.body;
    const todaysDate = new Date();
    try {
        const quotePrice = await calculateQuote(quoteData);
        const response = await insertQuotes(quoteData, quotePrice, todaysDate);
        res.json({success: true, payload: response});
    } catch (err) {
        res.json({success: false, code: 501, message: "Could not find a quote"});
    }
    /*
    - Try to post the quote to the database
    - 
    */
    
});
  
export default router;
  