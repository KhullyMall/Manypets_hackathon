export async function addQuoteInfo(quoteData, quotePrice, date) {
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
      quoteData.species,
      quoteData.breed,
      quoteData.age,
      quoteData.address,
      quoteData.postcode,
      quotePrice,
      date,
    ]
  );
  return response.rows;
}
