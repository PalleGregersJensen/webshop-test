"use strict";

let items = [];

window.addEventListener("load", start);

async function start() {
  console.log("JS kører");
  items = await getJsonFile();
  console.log(items);
  showItems(items);
  document.querySelector("#liquor-checkbox").addEventListener("change", filterByLiquorAndBeer);
  document.querySelector("#beer-checkbox").addEventListener("change", filterByLiquorAndBeer);
  document.querySelector("#sort-by").addEventListener("change", handleSortBy);
  document.querySelector("#search-field").addEventListener("keyup", searchFunction);
}

async function getJsonFile() {
  const response = await fetch("list-of-items.json");
  console.log(response);
  const data = await response.json();
  console.log(data);
  return data;
}

function showItems(beerList) {
  document.querySelector("#items-list").innerHTML = "";
  for (const beer of beerList) {
    const beerHtml = /*html*/ `<p>${beer.name} <br>
    <img src=${beer.image} alt="beer.caption"/> <br> 
    Description: ${beer.description} <br> 
    Price: ${beer.price} <br> <button id="add-to-basket">Add to basket</button></p>`;
    document.querySelector("#items-list").insertAdjacentHTML("beforeend", beerHtml);
  }
}

// ======== Sort function ===========
function handleSortBy() {
  const sortBy = document.querySelector("#sort-by").value;
  if (sortBy === "low-to-high") {
    console.log("low-to-high");
    items.sort((a, b) => a.price - b.price);
    showItems(items);
  } else if (sortBy === "high-to-low") {
    console.log("high-to-low");
    items.sort((a, b) => b.price - a.price);
    showItems(items);
  } else if (sortBy === "alphabetical") {
    console.log("alphabetical");
    items.sort((a, b) => a.name.localeCompare(b.name));
    showItems(items);
  }
}

// function filterByBeer() {
//   if (document.querySelector("#beer-checkbox").checked && !document.querySelector("#liquor-checkbox").checked) {
//     console.log("beer checked");
//     const result = items.filter(checkForBeer);
//     showItems(result);
//   }
// }

function filterByLiquorAndBeer() {
  if (document.querySelector("#liquor-checkbox").checked && !document.querySelector("#beer-checkbox").checked) {
    console.log("liquor checked");
    const result = items.filter(checkForLiquor);
    showItems(result);
  } else if (document.querySelector("#beer-checkbox").checked && !document.querySelector("#liquor-checkbox").checked) {
    console.log("beer checked");
    const result = items.filter(checkForBeer);
    showItems(result);
  } else if (!document.querySelector("#liquor-checkbox").checked && !document.querySelector("#beer-checkbox").checked) {
    showItems(items);
  } else if (document.querySelector("#liquor-checkbox").checked && document.querySelector("#beer-checkbox").checked) {
    showItems(items);
  } else if (document.querySelector("#liquor-checkbox").checked && document.querySelector("#beer-checkbox").checked) {
    showItems(items);
  } else if (document.querySelector("#liquor-checkbox").checked && !document.querySelector("#beer-checkbox").checked) {
    showItems(items);
  }
}

function checkForLiquor(items) {
  return items.type === "liquor";
}

function checkForBeer(items) {
  return items.type === "beer";
}

function searchFunction() {
  let searchValue = document.querySelector("#search-field").value;
  searchValue = searchValue.toLowerCase();
  console.log(searchValue);
}
