import { items, endpoint, start } from "./app.js"


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
        type: type
    }    
    return item;
}








export {createNewItemBeer}