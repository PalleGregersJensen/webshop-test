"use strict";

let items = [];

window.addEventListener("load", start);

async function start() {
  console.log("JS kører");
  items = await getJsonFile();
  console.log(items);
    showItems(items);
    document.querySelector("#sort-by").addEventListener("change", handleSortBy);
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
    const beerHtml = /*html*/ `<li>${beer.name}, 
    <img src=${beer.image} alt="beer.caption"/>, 
    ${beer.description}, 
    ${beer.price} <button id="add-to-basket">Add to basket</button></li>`;
    document.querySelector("#items-list").insertAdjacentHTML("beforeend", beerHtml);
  }
}

function handleSortBy() {
    const sortBy = document.querySelector("#sort-by").value;
    if (sortBy === "low-to-high") {
        console.log("low-to-high");
        items.sort((a, b) => a.price - b.price)
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