"use strict";

let items = [];
let filteredItems = [];

window.addEventListener("load", start);

// =========== start function ============
async function start() {
  console.log("JS kører");
  items = await getJsonFile();
  console.log(items);
  filteredItems = items;
  console.log(filteredItems);
  showItems(filteredItems);
  document.querySelector("#liquor-checkbox").addEventListener("change", filterByLiquorAndBeer);
  document.querySelector("#beer-checkbox").addEventListener("change", filterByLiquorAndBeer);
  document.querySelector("#sort-by").addEventListener("change", handleSortBy);
  document.querySelector("#search-field").addEventListener("keyup", searchFunction);
}

// =========== fetch JSON-file function ============
async function getJsonFile() {
  const response = await fetch("list-of-items.json");
  console.log(response);
  const data = await response.json();
  console.log(data);
  return data;
}

// =========== show beer and liquor function ============
function showItems(beerList) {
  document.querySelector("#items-list").innerHTML = "";
  for (const beer of beerList) {
    const beerHtml = /*html*/ `<p>${beer.name} <br>
    <img src=${beer.image} alt="beer.caption"/> <br> 
    Description: ${beer.description} <br> 
    Price: ${beer.price} <br> <button class="add-to-basket">Add to basket</button></p>`;
    document.querySelector("#items-list").insertAdjacentHTML("beforeend", beerHtml);
  }
   const addToBasketButtons = document.querySelectorAll(".add-to-basket");
   addToBasketButtons.forEach((button) => {
     button.addEventListener("click", addToBasket);
     console.log(button);
   });
}

// ======== Sort function ===========
function handleSortBy() {
  const sortBy = document.querySelector("#sort-by").value;
  const beerCheckboxChecked = document.querySelector("#beer-checkbox").checked;
  const liquorCheckboxChecked = document.querySelector("#liquor-checkbox").checked;
  console.log(beerCheckboxChecked);
  console.log(liquorCheckboxChecked);

  // Først anvender vi filteret baseret på checkbox-status
  if (beerCheckboxChecked && !liquorCheckboxChecked) {
    filteredItems = items.filter(checkForBeer);
  } else if (liquorCheckboxChecked && !beerCheckboxChecked) {
    filteredItems = items.filter(checkForLiquor);
  } else if (beerCheckboxChecked && liquorCheckboxChecked) {
    filteredItems = items; // Hvis begge checkboxe er markeret, viser vi alle elementer
  } else {
    // Hvis ingen af checkboxene er markeret, viser vi alle elementer
    showItems(items);
  }

  if (sortBy === "low-to-high") {
    console.log("low-to-high");
    filteredItems.sort((a, b) => a.price - b.price);
    console.log(filteredItems);
    showItems(filteredItems);
  } else if (sortBy === "high-to-low") {
    console.log("high-to-low");
    filteredItems.sort((a, b) => b.price - a.price);
    console.log(filteredItems);
    showItems(filteredItems);
  } else if (sortBy === "alphabetical") {
    console.log("alphabetical");
    filteredItems.sort((a, b) => a.name.localeCompare(b.name));
    showItems(filteredItems);
  }
}

// =========== filter function ============
function filterByLiquorAndBeer() {
  //============= show liquor ==============
  if (document.querySelector("#liquor-checkbox").checked && !document.querySelector("#beer-checkbox").checked) {
    console.log("liquor checked");
    const result = filteredItems.filter(checkForLiquor);
    showItems(result);
    //========== show beer ===============
  } else if (document.querySelector("#beer-checkbox").checked && !document.querySelector("#liquor-checkbox").checked) {
    console.log("beer checked");
    const result = filteredItems.filter(checkForBeer);
    showItems(result);
    //========== show both beer and liquor ===============
  } else if (!document.querySelector("#liquor-checkbox").checked && !document.querySelector("#beer-checkbox").checked) {
    showItems(filteredItems);
  } else if (document.querySelector("#liquor-checkbox").checked && document.querySelector("#beer-checkbox").checked) {
    showItems(filteredItems);
  } else if (document.querySelector("#liquor-checkbox").checked && !document.querySelector("#beer-checkbox").checked) {
    showItems(filteredItems);
  }
}

// =========== check for liquor function ============
function checkForLiquor(items) {
  return items.type === "liquor";
}

// =========== check for beer function ============
function checkForBeer(items) {
  return items.type === "beer";
}

// =========== search function ============
function searchFunction() {
  let searchValue = document.querySelector("#search-field").value;
  searchValue = searchValue.toLowerCase();
  console.log(searchValue);
}


function addToBasket() {
  console.log("registreres klik");
}