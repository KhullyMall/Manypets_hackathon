import { query } from "../db/index.js";

export async function getCount() {
  const response = await query(
    "SELECT count(id) FROM quotes where date_added = CURRENT_DATE;"
  );
  const display = response;
  console.log(display);
  return display;
}
