import { OrderItem } from "./orderItem";
import { User } from "./user";

export class Order {
    orderItems?:OrderItem[];
    shippingAddress1?:string;
    shippingAddress2?:string;
    city?:string;
    country?:string;
    street?:string;
    apartment?:string;
    totalPrice?:number;
    user?:User[];
    zip?:string;
    status?:number
    dateOrdered?:string;
}