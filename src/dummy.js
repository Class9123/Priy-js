import ramenImg from "@assets/generated_images/spicy_ramen_bowl.png";
import burgerImg from "@assets/generated_images/gourmet_cheeseburger.png";
import pizzaImg from "@assets/generated_images/pepperoni_pizza.png";
import sushiImg from "@assets/generated_images/sushi_platter.png";
import chickenImg from "@assets/generated_images/crispy_chicken_wings.png";
import saladImg from "@assets/generated_images/healthy_salad_bowl.png";
import pastaImg from "@assets/generated_images/creamy_pasta_dish.png";
import curryImg from "@assets/generated_images/butter_chicken_curry.png";

const products = [{
  id: 1,
  name: "Spicy Ramen",
  price: 18.00,
  image: ramenImg,
  isAvailable: false,
  restaurantName: "Mungariya"
}, {
  id: 2,
  name: "Classic Burger",
  price: 14.50,
  image: burgerImg,
  isAvailable: true,
  restaurantName: "Partik"
}, {
  id: 3,
  name: "Pepperoni Pizza",
  price: 22.00,
  image: pizzaImg,
  isAvailable: false,
  restaurantName: "Momo hunt"
}, {
  id: 4,
  name: "Fresh Sushi",
  price: 28.00,
  image: sushiImg,
  isAvailable: true,
  restaurantName: "Khusbhu baisna Vaishnavi the hotel"
}, {
  id: 5,
  name: "Chicken Wings",
  price: 16.00,
  image: chickenImg,
  isAvailable: false,
  restaurantName: "Shiv Shankar"
}, {
  id: 6,
  name: "Garden Salad",
  price: 12.00,
  image: saladImg,
  isAvailable: true,
  restaurantName: "Chaat house"
}, {
  id: 7,
  name: "Creamy Pasta",
  price: 19.00,
  image: pastaImg,
  isAvailable: true,
  restaurantName: "Riya fast food"
}, {
  id: 8,
  name: "Butter Chicken",
  price: 20.00,
  image: curryImg,
  isAvailable: false,
  restaurantName: "Mungariya"
}];

const restaurants = [
  {
  id: 1,
  name: "Ramen House",
  cuisine: "Japanese",
  rating: 4.8,
  deliveryTime: "25-35 min",
  image: ramenImg,
  location: {
    address: "Mirchaiya",
    lat: 0,
    long: 2
  }
},
  {
  id: 3,
  name: "Ramen House",
  cuisine: "Japanese",
  rating: 4.8,
  deliveryTime: "25-35 min",
  image: burgerImg,
  location: {
    address: "Mirchaiya",
    lat: 0,
    long: 2
  }
},
  {
  id: 3,
  name: "Ramen House",
  cuisine: "Japanese",
  rating: 4.8,
  deliveryTime: "25-35 min",
  image: ramenImg,
  location: {
    address: "Mirchaiya",
    lat: 0,
    long: 2
  }
},
  {
  id: 3,
  name: "Ramen House",
  cuisine: "Japanese",
  rating: 4.8,
  deliveryTime: "25-35 min",
  image: ramenImg,
  location: {
    address: "Mirchaiya but BJ BB",
    lat: 0,
    long: 2
  }
},
  {
  id: 3,
  name: "Ramen House",
  cuisine: "Japanese",
  rating: 4.8,
  deliveryTime: "25-35 min",
  image: ramenImg,
  location: {
    address: "Mirchaiya",
    lat: 0,
    long: 2
  }
},
  {
  id: 3,
  name: "Ramen House",
  cuisine: "Japanese",
  rating: 4.8,
  deliveryTime: "25-35 min",
  image: ramenImg,
  location: {
    address: "Mirchaiya",
    lat: 0,
    long: 2
  }
},
  {
  id: 3,
  name: "Ramen House",
  cuisine: "Japanese",
  rating: 4.8,
  deliveryTime: "25-35 min",
  image: ramenImg,
  location: {
    address: "Mirchaiya",
    lat: 0,
    long: 2
  }
},
  {
  id: 3,
  name: "Ramen House",
  cuisine: "Japanese",
  rating: 4.8,
  deliveryTime: "25-35 min",
  image: ramenImg,
  location: {
    address: "Mirchaiya",
    lat: 0,
    long: 2
  }
},
];

export {
  products,
  restaurants
}