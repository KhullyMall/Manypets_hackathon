import fetch from 'fetch';

export function calculateQuote(age, breed, address, numberPets) {
    // Number Pets given by the size array
    const basePrice = 120;
    // If noPets more thean too, call that function multipetdiscount
    // When telling if breed is valid, then apply discuont there
    // Same with postcode premiums
}

function multiPetDiscount(price) {
    const discount = 0.9;
    return discount*price 
}

function breedDiscount(price, breed) {
    const discountedBreeds = ['germanshepherd', 'pug', 'boxer'];
    if(discountedBreeds.includes(breed)) {
        
    }
    const discount = 0.9;
    return discount*numberPets
}