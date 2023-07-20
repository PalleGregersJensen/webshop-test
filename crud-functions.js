import {items} from "./app.js"

function createNewItem(event) {
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








export {createNewItem}