"use strict"

let items = [];

window.addEventListener("load", start);

async function start() {
    console.log("JS kører");
    items = await getJsonFile();
    console.log(items);
    showItems(items);
}

async function getJsonFile() {
    const response = await fetch ("list-of-items.json");
    console.log(response);
    const data = await response.json();
    console.log(data);
    return data;
}

function showItems(beerList) {
  for (const beer of beerList) {
    const beerHtml = /*html*/ `<li>${beer.name}, <img src="${beer.image}">, ${beer.description}, ${beer.price}</li>`;
    document.querySelector("#items-list").insertAdjacentHTML("beforeend", beerHtml);
  }
}