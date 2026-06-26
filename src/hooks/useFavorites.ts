import { Products } from "@/types/product";

export const getProducts = async () => {
    const res = await fetch('https://dummyjson.com/products');
    const products: Products[] = await res.json();
    return products;
}

//https://fakestoreapi.com/products