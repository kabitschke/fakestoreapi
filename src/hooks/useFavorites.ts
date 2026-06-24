import { Products } from "@/types/product";

export const getProducts = async () => {
    const res = await fetch('https://fakestoreapi.com/products');
    const products: Products[] = await res.json();
    return products;
}