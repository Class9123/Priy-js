import { useArray } from "priy";

const items = useArray([
  {
    name: "Samosa",
    price: "Rs. 15",
    num:1,
    thumbnail:
      "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600"
  },
  {
    name: "Noodles",
    price: "Rs. 100",
    num:1,
    thumbnail:
      "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600"
  },
  {
    name: "Chaat",
    price: "Rs. 70",
    num:1,
    thumbnail:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600"
  },
  {
    name: "Momo",
    price: "Rs. 90",
    num:1,
    thumbnail:
      "/banner.svg"
  }
]);

export default items;
