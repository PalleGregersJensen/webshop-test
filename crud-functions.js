import { items, endpoint, start, liquorItems, beerItems, beerObject } from "./app.js";

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
  const clickedItem = event.target.parentElement; // Det klikkede element
  console.log(clickedItem);
  const name = clickedItem.querySelector("name");
  console.log(name);
  const description = clickedItem.querySelector(".description").textContent;
  console.log(description);

  // Opdater input-felter med værdierne
  document.querySelector("#update-name").value = name;
  document.querySelector("#update-description").value = description;

  // Åbn opdateringsdialogboksen
  document.querySelector("#dialog-update-item").showModal();
}

// let updateForm = event.target.parentElement.innerHTML;
// console.log(updateForm);
// let objectItem = JSON.stringify(updateForm);
// console.log(objectItem);
// objectItem = JSON.parse(objectItem);
// console.log(objectItem);
// let name = document.querySelector("#update-name");
// console.log(name);
// let breakBeforeName = updateForm[10];
// console.log(breakBeforeName);
// let breakAfterName =
// name.value = objectItem.name;

// console.log(data);
// let firstSepartion = updateForm.lastIndexOf("data-id");
// firstSepartion = firstSepartion + 4;
// console.log(firstSepartion);
// let name = updateForm.slice(firstSepartion, 20);
// console.log(name);
// let price = updateForm.price;
// console.log(price);
// let image = updateForm.image;
// console.log(image);
// let description = updateForm.description;
// console.log(description);
// let type = updateForm.type;
// console.log(type);
// updateForm.setAttribute("data-id", id);
//   document.querySelector("#dialog-update-item").showModal();
// }

async function updateItem(event) {
  console.log("update item");
  const form = event.target;
  console.log(form);
  const name = form.name.value;
  console.log(name);
  const description = form.description.value;
  console.log(description);
  const image = form.image.value;
  const price = form.price.value;
  const type = form.type.value;
  const id = form.getAttribute("data-id");
  const response = await updateItemWIthHTTPRequestPut(id, name, description, image, price, type);
  if (response.ok) {
    console.log("Item succesfully updated in firebase");
    start();
  } else {
    console.log("Something went wrong. Please try again");
    document.querySelector("#error-message-update").textContent = "Something went wrong. Please try again.";
    // document.querySelector("#update-movie-dialog").showModal();
  }
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
    const response = await fetch(`${endpoint}/beer/${id}.json`, {
      method: "PUT",
      body: json,
    });
    return response;
  } else if (type === "liquor") {
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
