console.log("It is working");
let counter = document.querySelector(".count");

async function getCount() {
  const response = await fetch("http://localhost:3000/quotes");
  const display = await response.json();
  counter.innerHTML = display[0].count;
}

getCount();
