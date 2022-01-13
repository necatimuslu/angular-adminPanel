import { Category } from "./category";

export class Product {
    id?:string;
    name?:string;
    image?:string;
    description?:string;
    images?:string[];
    richDescription?:string;
    brand?:string;
    rating?:number;
    price?:number;
    category?:Category[];
    isFeatured?:Boolean;
}