'use client'
import { useEffect, useState } from "react";
import styles from "@/components/ProductCard.module.css";
import { getProducts } from "@/hooks/useFavorites";
import { SearchBar } from "./SearchBar";
import { Product, ProductsResponse } from "@/types/product";

export const ProductCard = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filtered, setFiltered] = useState<Product[]>([]);
    const [listPage, setlistPage] = useState<ProductsResponse>();
    const [page, setPage] = useState(1);



    useEffect(() => {
        const fetchData = async () => {
            const data = await getProducts(page);
            setProducts(data.products);
            setFiltered(data.products);
            setlistPage(data);


        };

        fetchData();
    }, [page]);

    const limit = 30;
    const totalPages = listPage ? Math.ceil(listPage.total / limit) : 0;




    return (
        <div>
            <SearchBar products={products} setFiltered={setFiltered} />

            <div className={styles.container}>

                {

                    filtered.length > 0 ? (

                        filtered.map((items) => (
                            <div key={items.id} className={styles.productCard}>
                                <h2 className={styles.title}>{items.title}</h2>
                                <p className={styles.description}>{items.description}</p>
                                <p className={styles.category}>{items.category}</p>
                                <img src={items.images[0]} alt={items.images[0]} />
                                <p className={styles.price}>R$ {items.price}</p>
                            </div>

                        )

                        )) : (
                        <p>Nenhum produto encontrado</p>
                    )
                }

            </div>

            <div className={styles.pagination}>
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                >
                    Anterior
                </button>

                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={page === i + 1 ? styles.active : ""}
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    disabled={page === totalPages}
                    onClick={() => {
                        if (page < totalPages) {
                            setPage((p) => p + 1);
                        }
                    }}
                >
                    Próxima
                </button>
            </div>

        </div>
    );
};