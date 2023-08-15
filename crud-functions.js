import { items, endpoint, start, liquorItems, beerItems } from "./app.js";

async function createNewItemBeer(event) {
  console.log("Create new item");
  event.preventDefault();
  const form = event.target;
  const name = form.name.value;
  const price = Number(form.price.value);
  const image = form.image.value;
  const description = form.description.value;
  const type = form.type.value;
  const newItem = createNewItemObject(name, price, image, description, type);
  console.log(newItem);
  const json = JSON.stringify(newItem);
  console.log(json);
  const response = await fetch(`${endpoint}/beers.json`, {
    method: "POST",
    body: json,
  });
  if (response.ok) {
    console.log("New items added");
    start();
  }

  items.push(newItem);
  console.log(items);
  form.reset();
}

function createNewItemObject(name, price, image, description, type) {
  const item = {
    name: name,
    price: price,
    image: image,
    description: description,
    type: type,
  };
  return item;
}

function updateItem() {
  console.log("update item");
}

// Slet et eksisterende element
async function deleteItemClicked(event) {
  console.log("delete item");
  const beerOrLiquorObject = event.target;
  console.log(beerOrLiquorObject);
  const itemId = beerOrLiquorObject.getAttribute("data-id");
  console.log(itemId);
  let beerOrLiquorElement = beerOrLiquorObject.parentElement;
  console.log(beerOrLiquorElement);
  // beerOrLiquorElement = beerOrLiquorElement.firstChild;
  beerOrLiquorElement = beerOrLiquorElement.innerText;
  console.log(beerOrLiquorElement);
  let liquorElementString = beerOrLiquorElement.slice(0, 6); // Corrected conversion
  console.log(liquorElementString);
  let beerElementString = beerOrLiquorElement.slice(0, 4); // Corrected conversion
  console.log(beerElementString);

  if (beerElementString === "beer") {
    console.log("delete beer");
    const response = await deleteItemBeer(itemId);
    console.log(response);
    if (response.ok) {
      console.log("Beer item deleted");
      start();
    }
  } else if (liquorElementString === "liquor") {
    console.log("delete liquor");
    const response = await deleteItemLiquor(itemId);
    console.log(response);
    if (response.ok) {
      console.log("Liquor item deleted");
      start();
    }
  }
}

// delete an existing item - HTTP Method: DELETE
async function deleteItemBeer(id) {
  const response = await fetch(`${endpoint}/beers/${id}.json`, {
    method: "DELETE",
  });
  return response;
}

  // delete an existing item - HTTP Method: DELETE
async function deleteItemLiquor(id) {
  const response = await fetch(`${endpoint}/liquor/${id}.json`, {
    method: "DELETE",
  });
  return response;
}

  
export { createNewItemBeer, deleteItemBeer, updateItem, deleteItemClicked, deleteItemLiquor };
