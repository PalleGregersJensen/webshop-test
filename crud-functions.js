import { items, endpoint, start, liquorItems, beerItems, objectItemArray } from "./app.js";

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
  if (type === "beer") {
    const response = await fetch(`${endpoint}/beers.json`, {
      method: "POST",
      body: json,
    });
    if (response.ok) {
      console.log("New items added");
      start();
    }
  }
  if (type === "liquor") {
    const response = await fetch(`${endpoint}/liquor.json`, {
      method: "POST",
      body: json,
    });
    if (response.ok) {
      console.log("New items added");
      start();
    }
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

function updateItemClicked(event) {
  console.log("update item clicked");
  let objectItem = createObjectItem();
  objectItemArray.push(objectItem);
  console.log(objectItemArray);

  // Variabler til inputfelter i update form
  let nameInUodateDialog = document.querySelector("#update-name");
  let descriptionInUodateDialog = document.querySelector("#update-description");
  let priceInUodateDialog = document.querySelector("#update-price");
  let imageInUodateDialog = document.querySelector("#update-image");
  // let typeInUodateDialog = document.querySelector("#update-type");
  // let idInUodateDialog = document.querySelector("#update-name");

  // Sæt værdier i update form til det samme, som de står i på hjemmeside
  nameInUodateDialog.value = objectItem.name;
  descriptionInUodateDialog.value = objectItem.description;
  priceInUodateDialog.value = objectItem.price;
  imageInUodateDialog.value = objectItem.image;
  // typeInUodateDialog.value = type;

  
  // Åbn opdateringsdialogboksen
  document.querySelector("#dialog-update-item").showModal();
  document.querySelector("#form-update-item").addEventListener("submit", updateItem);
}

function createObjectItem() {
  let clickedItem = event.target.parentElement.innerHTML; // Det klikkede element
  console.log(clickedItem);
  clickedItem = String(clickedItem);
  // Find name
  let firstNamePosition = clickedItem.search("Name") + 6;
  console.log(firstNamePosition);
  let secondNamePosition = clickedItem.indexOf("<br>", 16);
  console.log(secondNamePosition);
  let name = clickedItem.slice(firstNamePosition, secondNamePosition - 1);
  console.log(name);
  // Find description
  let firstDescriptionPosition = clickedItem.search("Description") + 13;
  console.log(firstDescriptionPosition);
  let secondDescriptionPosition = clickedItem.indexOf("Price") - 6;
  console.log(secondDescriptionPosition);
  let description = clickedItem.slice(firstDescriptionPosition, secondDescriptionPosition - 1);
  console.log(description);
  // Find price
  let firstPricePosition = clickedItem.search("Price") + 7;
  console.log(firstPricePosition);
  let secondPricePosition = clickedItem.indexOf("button class") - 7;
  console.log(secondPricePosition);
  let price = clickedItem.slice(firstPricePosition, secondPricePosition - 1);
  console.log(price);
  // Find id
  let firstIdPosition = clickedItem.search("data-id") + 9;
  console.log(firstIdPosition);
  let secondIdPosition = clickedItem.indexOf("Delete item") - 1;
  console.log(secondIdPosition);
  let id = clickedItem.slice(firstIdPosition, secondIdPosition - 1);
  console.log(id);
  // Find image
  let firstImagePosition = clickedItem.search("img src") + 9;
  console.log(firstImagePosition);
  let secondImagePosition = clickedItem.indexOf("alt=") - 1;
  console.log(secondImagePosition);
  let image = clickedItem.slice(firstImagePosition, secondImagePosition - 1);
  console.log(image);
  // Find type
  let firstTypePosition = clickedItem.search("Type") + 6;
  console.log(firstTypePosition);
  let secondTypePosition = clickedItem.indexOf("Name") - 5;
  console.log(secondTypePosition);
  let type = clickedItem.slice(firstTypePosition, secondTypePosition - 1);
  console.log(type);
  
  let objectItem = {
    name: name,
    description: description,
    id: id,
    price: price,
    image: image,
    type: type,
  };
  console.log(objectItem);
  return objectItem;
}

async function updateItem(event) {
  event.preventDefault();
  console.log("update item");
  // const form = event.target;
  // console.log(form);
  // console.log(form);
  // const name = form.name;
  // console.log(name);
  // const description = form.description.value;
  // console.log(description);
  // let objectItem = createObjectItem();
  let objectItem = objectItemArray[0];
  console.log(objectItem);
  const image = objectItem.image;
  console.log(image);
  const price = objectItem.price;
  console.log(price);
  const type = objectItem.type;
  console.log(type);
  const name = objectItem.name;
  console.log(name);
  const description = objectItem.description;
  console.log(description);
  const id = objectItem.id;
  console.log(id);
  const response = await updateItemWIthHTTPRequestPut(id, name, description, image, price, type);
  if (response.ok) {
    console.log("Item succesfully updated in firebase");
    start();
  } else {
    console.log("Something went wrong. Please try again");
    document.querySelector("#error-message-update").textContent = "Something went wrong. Please try again.";
    // document.querySelector("#update-movie-dialog").showModal();
  }
  objectItemArray.pop();
  console.log(objectItemArray);
}

// update an exitsting movie - HTTP Method: PUT
async function updateItemWIthHTTPRequestPut(id, name, description, image, price, type) {
  const itemToUpdate = {
    name,
    description,
    image,
    type,
    id,
    price,
  }; // item update to update
  const json = JSON.stringify(itemToUpdate); // convert the JS objekt to JSON string
  if (type === "beer") {
    console.log(type);
    console.log(id);
    const response = await fetch(`${endpoint}/beers/${id}.json`, {
      method: "PUT",
      body: json,
    });
    return response;
  } else if (type === "liquor") {
    console.log(type);
    console.log(id);
    const response = await fetch(`${endpoint}/liquor/${id}.json`, {
      method: "PUT",
      body: json,
    });
    return response;
  }
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
  beerOrLiquorElement = beerOrLiquorElement.innerText;
  console.log(beerOrLiquorElement);
  let liquorElementString = String(beerOrLiquorElement.slice(6, 12)); // Corrected conversion
  console.log(liquorElementString);
  let beerElementString = String(beerOrLiquorElement.slice(6, 10)); // Corrected conversion
  console.log(beerElementString);

  if (beerElementString == "beer") {
    console.log("delete beer");
    const response = await deleteItemBeer(itemId);
    console.log(response);
    if (response.ok) {
      console.log("Beer item deleted");
      start();
    }
  } else if (liquorElementString == "liquor") {
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

export { createNewItemBeer, deleteItemBeer, updateItem, deleteItemClicked, deleteItemLiquor, updateItemClicked };
