export function finalPrice(body) {
  let finalPrice = 0;
  //Looping through the POST request body
  for (let i = 0; i < body.lenght; i++) {
    finalPrice =
      finalPrice + calculateQuote(body[i].age, body[i].breed, body[i].postcode);
  }

  if (body.lenght > 1) {
    finalPrice = multiPetDiscount(finalPrice);
  }
  return finalPrice;
}

function calculateQuote(age, breed, postcode) {
  // Number Pets given by the size array
  const basePrice = 120;

  let price = startPrice(basePrice, age);

  const discountedBreeds = ["germanshepherd", "pug", "boxer"];
  const premiumPostcodes = ["SW", "NW", "KT"];

  if (discountedBreeds.includes(breed)) {
    price = breedDiscount(price);
  }
  if (premiumPostcodes.includes(postcode.slice(0, 1))) {
    price = postcodePremium(price);
  }

  // If noPets more thean too, call that function multipetdiscount
  // When telling if breed is valid, then apply discuont there
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

//console.log(calculateQuote(14, "germanashepherd", "SQ22SS", 1));
