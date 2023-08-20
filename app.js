import { createNewItemBeer, updateItem, deleteItemClicked, updateItemClicked } from "./crud-functions.js";

("use strict");

const endpoint = "https://webshop-test-93659-default-rtdb.firebaseio.com/";

let beerItems = [];
let liquorItems = [];
let items = [];
let filteredItems = [];
let basket = [];
let price;
let priceInAll = 0;
let objectItemArray = [];

window.addEventListener("load", start);

// =========== start function ============
async function start() {
  console.log("JS kører");
  beerItems = await getJsonFileBeers();
  console.log(beerItems);
  liquorItems = await getJsonFileLiquor();
  console.log(liquorItems);
  items = beerItems.concat(liquorItems);
  console.log(items);
  filteredItems = items;
  console.log(filteredItems);
  console.log(endpoint);
  showItems(filteredItems);
  document.querySelector("#liquor-checkbox").addEventListener("change", filterByLiquorAndBeer);
  document.querySelector("#beer-checkbox").addEventListener("change", filterByLiquorAndBeer);
  document.querySelector("#sort-by").addEventListener("change", handleSortBy);
  document.querySelector("#search-field").addEventListener("keyup", searchFunction);
  document.querySelector("#create-new-item-button").addEventListener("click", openDialogToCreateNewItem);
  // document.querySelector("#form-update-item").addEventListener("submit", updateItem);
  // document.querySelector("#form-update-item").showModal();
}
function openDialogToCreateNewItem(event) {
  document.querySelector("#dialog-create-new-item").showModal();
  document.querySelector("#form-create-new-item").addEventListener("submit", createNewItemBeer);
}
// =========== fetch JSON-file-beers function ============
async function getJsonFileBeers() {
  const response = await fetch(`${endpoint}/beers.json`);
  console.log(response);
  const data = await response.json();
  console.log(data);
  beerItems = prepareData(data);
  return beerItems;
}

// =========== fetch JSON-file-liquor function ============
async function getJsonFileLiquor() {
  const response = await fetch(`${endpoint}/liquor.json`);
  console.log(response);
  const data = await response.json();
  console.log(data);
  liquorItems = prepareData(data);
  return liquorItems;
}

// convert object of objects til an array of objects - both beers and liquor
function prepareData(dataObject) {
  const array = []; // define empty array
  // loop through every key in dataObject
  // the value of every key is an object
  for (const key in dataObject) {
    const object = dataObject[key]; // define object
    object.id = key; // add the key in the prop id
    array.push(object); // add the object to array
  }
  return array; // return array back to "the caller"
}

// =========== show beer and liquor function ============
function showItems(beerList) {
  document.querySelector("#items-list").innerHTML = "";
  for (const beer of beerList) {
    const beerHtml = /*html*/ `<p>Type: ${beer.type} <br> Name: ${beer.name} <br>
<img src=${beer.image} alt="beer.caption"/> <br> 
Description: ${beer.description} <br> 
Price: ${beer.price} <br> 
<button class="add-to-basket">Add to basket</button> 
<button class="delete-item-button" data-id="${beer.id}">Delete item</button> 
<button class="update-item-button">Update item</button></p>`;
    document.querySelector("#items-list").insertAdjacentHTML("beforeend", beerHtml);
    console.log(beer.id);
  }
  const addToBasketButtons = document.querySelectorAll(".add-to-basket");
  const deleteItemButtons = document.querySelectorAll(".delete-item-button");
  const updateItemButtons = document.querySelectorAll(".update-item-button");

  for (const button of addToBasketButtons) {
    button.addEventListener("click", addToBasket);
    // console.log(button);
  }

  for (const button of deleteItemButtons) {
    button.addEventListener("click", (event) => deleteItemClicked(event));
  }

  // for (const button of deleteItemButtons) {
  //   button.addEventListener("click", deleteItemClicked);
  //   // console.log(button);
  // }

  for (const button of updateItemButtons) {
    button.addEventListener("click", updateItemClicked);
    // console.log(button);
  }
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
  const searchResult = searchInput(searchValue);
  console.log(searchResult);
  showItems(searchResult);
}

function searchInput(searchValue) {
  searchValue = searchValue.toLowerCase();
  const results = items.filter(checkSearchValue);

  function checkSearchValue(item) {
    let result = item.name.toLowerCase();
    console.log(result);
    return result.includes(searchValue); // Opdateret denne linje
  }
  return results;
}

function addToBasket(event) {
  const clickedButton = event.target;
  const itemInfoContainer = clickedButton.parentElement;
  let itemName = itemInfoContainer.innerText;
  let breakForName = itemName.indexOf("Description");
  let breakForPrice = itemName.lastIndexOf("Price:");
  console.log(breakForName);
  console.log(breakForPrice);
  itemName = itemName.slice(0, breakForName);
  console.log(itemName);
  let itemPrice = itemInfoContainer.innerText;
  let lastBreakForprice = itemPrice.lastIndexOf("Add");
  itemPrice = itemPrice.slice(breakForPrice + 7, lastBreakForprice);
  console.log(itemPrice);
  itemPrice = Number(itemPrice);
  console.log(itemPrice);

  // Opret et objekt for det valgte element
  const item = {
    name: itemName,
    price: itemPrice,
  };

  // Tilføj det valgte element til "basket" arrayet
  basket.push(item);

  // Udskriv basket-arrayet til konsollen for at bekræfte, at elementet blev tilføjet
  console.log("Basket: ", basket);
  showBasket(basket);
}

// Vis basket-arrayet på hjemmeside
function showBasket(basketList) {
  document.querySelector("#basket-list").innerHTML = "";
  for (const basketObject of basketList) {
    const basketHtml = /*html*/ `<p>Name: ${basketObject.name}, Price: ${basketObject.price}</p>`;
    document.querySelector("#basket-list").insertAdjacentHTML("beforeend", basketHtml);
  }
  showPriceInAll(basket);
}

// =========== Vis samlet pris på varer i basket =============
function showPriceInAll(basketList) {
  document.querySelector("#basket-total").innerHTML = "";
  for (const basketObject of basketList) {
    price = basketObject.price;
  }
  priceInAll = priceInAll + price;
  console.log(priceInAll);
  document.querySelector("#basket-total").textContent = `Price in total: ${priceInAll}`;
}

export { items, endpoint, start, beerItems, liquorItems, objectItemArray};
