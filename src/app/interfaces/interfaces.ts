// product.model.ts
export interface Rating {
 rate: number;
 count: number;
}

export interface Product {
 id: number;
 title: string;
 description: string;
 category: string;
 image: string;
 price: number;
 rating: Rating;
 quantity:number
}
export interface UserLogin{
 username:string
 password:string
}