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

function updateItemClicked(id, name, description, image, price, type) {
  console.log("update item clicked");
  let updateForm = event.target.parentElement;
  console.log(updateForm);
  updateForm.name.value = name;
  updateForm.price.value = price;
  updateForm.image.value = image;
  updateForm.description.value = description;
  updateForm.type.value = type;
  updateForm.setAttribute("data-id", id);
  document.querySelector("#dialog-update-item").showModal();
}

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
    console.log("Movie succesfully updatet in firebase");
    start();
  } else {
    console.log("Something went wrong. Please try again");
    document.querySelector("#error-message-update").textContent = "Something went wrong. Please try again.";
    document.querySelector("#update-movie-dialog").showModal();
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
  }
  else if (type === "liquor") {
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

export { createNewItemBeer, deleteItemBeer, updateItem, deleteItemClicked, deleteItemLiquor, updateItemClicked };
