import { query } from '../db/index.js';

export async function addQuoteInfo(quoteData, quotePrice, date) {
  const responseArray = [];
  for (let i=0; i<quoteData.length; i++) {
    const response = await query(
    `INSERT INTO quotes (
        species,
        breed,
        age,
        address,
        postcode,
        quote_price,
        date_added
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;`,

    [
      quoteData[i].species,
      quoteData[i].breed,
      quoteData[i].age,
      quoteData[i].address,
      quoteData[i].postcode,
      quotePrice,
      date,
    ]
  );
  responseArray.push(response.rows);
  }
  
  return responseArray;
}