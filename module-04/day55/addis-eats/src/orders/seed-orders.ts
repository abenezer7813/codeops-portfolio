import { type Order } from "./index.js"

export const seedOrders: Order[] = [
  { id: 1,  customer: "Abebe Kebede",   area: "Bole",      totalSantim: 45000,  status: "DELIVERED" ,dishes:[{name:"Pizza",priceSantim:45000}]  },
  { id: 2,  customer: "Selam Tadesse",  area: "Kazanchis", totalSantim: 32050,  status: "PENDING",   phone: "0911234567" ,dishes:[{name:"Burger",priceSantim:32050}]},
  { id: 3,  customer: "Dawit Hailu",    area: "Piassa",    totalSantim: 78000,  status: "PREPARING" ,dishes:[{name:"Pasta",priceSantim:78000}]},
  { id: 4,  customer: "Hana Girma",     area: "Megenagna", totalSantim: 21500,  status: "PENDING",   phone: "+251922345678" ,dishes:[{name:"Salad",priceSantim:21500}]},
  { id: 5,  customer: "Yonas Bekele",   area: "Bole",      totalSantim: 56000,  status: "DELIVERED" ,dishes:[{name:"Steak",priceSantim:56000}]},
  { id: 6,  customer: "Meron Alemu",    area: "Bole",      totalSantim: 18900,  status: "CANCELLED" ,dishes:[{name:"Chicken",priceSantim:18900}]},
  { id: 7,  customer: "Kidus Mulugeta", area: "Kazanchis", totalSantim: 64000,  status: "PREPARING", phone: "0933456789" ,dishes:[{name:"Beef",priceSantim:64000}]},
  { id: 8,  customer: "Tigist Worku",   area: "Piassa",    totalSantim: 27500,  status: "DELIVERED" ,dishes:[{name:"Sandwich",priceSantim:27500}]},
  { id: 9,  customer: "Biniyam Assefa", area: "Megenagna", totalSantim: 91000,  status: "PENDING" ,dishes:[{name:"Sushi",priceSantim:91000}]},
  { id: 10, customer: "Liya Desta",     area: "Bole",      totalSantim: 39900,  status: "PREPARING", phone: "0944567890" ,dishes:[{name:"Taco",priceSantim:39900}]},
  { id: 11, customer: "Samuel Tekle",   area: "Kazanchis", totalSantim: 15000,  status: "DELIVERED" ,dishes:[{name:"Salad",priceSantim:15000}]},
  { id: 12, customer: "Rahel Negash",   area: "Piassa",    totalSantim: 48200,  status: "PENDING",   phone: "+251955678901" ,dishes:[{name:"Pasta",priceSantim:48200}]},
];