export function finalPrice(body) {
  let finalPrice = 0;
  // Looping through the POST request body
  for (let i = 0; i < body.length; i++) {
    finalPrice =
      finalPrice + calculateQuote(body[i].age, body[i].breed, body[i].postcode);
  }
  // Multiped discount will be applied if more than one pet were received
  if (body.lenght > 1) {
    finalPrice = multiPetDiscount(finalPrice);
  }
  return Math.round(finalPrice);
}

// Calculating the insurance price of 1 pet
function calculateQuote(age, breed, postcode) {
  const basePrice = 120;

  let price = startPrice(basePrice, age);

  const discountedBreeds = ["germanshepherd", "pug", "boxer"];
  const premiumPostcodes = ["sw", "nw", "kt"];
  //console.log(premiumPostcodes.includes(postcode.slice(0, 2).toLowerCase()));
  if (discountedBreeds.includes(breed.toLowerCase())) {
    price = breedDiscount(price);
  }
  if (premiumPostcodes.includes(postcode.slice(0, 2).toLowerCase())) {
    price = postcodePremium(price);
  }

  return price;
}

function startPrice(price, age) {
  // newPrice = price * (1 + age*0.05 + heaviside(age-5) * (age-5)*0.05)
  let newPrice = price;
  if (age > 5) {
    newPrice = price * (1 + age * 0.05 + (age - 5) * 0.05);
  } else {
    newPrice = price * (1 + age * 0.05);
  }
  return newPrice;
}

function multiPetDiscount(price) {
  const discount = 0.9;
  return discount * price;
}

function breedDiscount(price) {
  const discount = 0.9;
  return discount * price;
}

function postcodePremium(price) {
  const premium = 1.15;

  return price * premium;
}

console.log(calculateQuote(0, "Germanshepherd", "Sw12ws", 1));
