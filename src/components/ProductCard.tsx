'use client'
import { useEffect, useState } from "react";
import styles from "@/components/ProductCard.module.css";
import { getProducts } from "@/hooks/useFavorites";
import { SearchBar } from "./SearchBar";
import { Products } from "@/types/product";

export const ProductCard = () => {
    const [products, setProducts] = useState<Products[]>([]);
    const [filtered, setFiltered] = useState<Products[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getProducts();
            setProducts(data);
            setFiltered(data); // começa mostrando tudo
        };

        fetchData();
    }, []);

    return (
        <div>
            <SearchBar products={products} setFiltered={setFiltered} />

            <div className={styles.container}>

                {
                    filtered.length > 0 ? (
                        filtered.map((product) => (
                            <div key={product.id} className={styles.productCard}>
                                <h2 className={styles.title}>{product.title}</h2>
                                <p className={styles.description}>{product.description}</p>
                                <p className={styles.category}>{product.category}</p>
                                {/* <img src={product.image} alt={product.title} /> */}
                                <p className={styles.price}>R$ {product.price}</p>
                            </div>
                        ))) : (
                        <p>Nenhum produto encontrado</p>
                    )
                }

            </div>
        </div>
    );
};