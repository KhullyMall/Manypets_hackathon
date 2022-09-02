import { pool } from "../index.js";

//Create a table which includes primary key id, reading_list_id (from readinglist table), and books (id for book)
async function createTable() {
  const created = await pool.query(
    `CREATE TABLE IF NOT EXISTS quotes ( 
        id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        userid INT,
        species TEXT,
        breed TEXT,
        age INT,
        address TEXT,
        postcode TEXT,
        quote_price INT,
        date_added DATE
    );`
  );
  console.log("Quote table created", created.command);
}

try {
  await createTable();
} catch (err) {
  console.error(err);
} finally {
  await pool.end();
}
