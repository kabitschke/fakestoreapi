'use client'
import { useEffect, useState } from "react";
import styles from "@/components/ProductCard.module.css";
import { getProducts } from "@/hooks/useFavorites";
import { SearchBar } from "./SearchBar";
import { Product, ProductsResponse } from "@/types/product";

export const ProductCard = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [listPage, setListPage] = useState<ProductsResponse>();
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    const limit = 30;

    useEffect(() => {
        const fetchData = async () => {
            const data = await getProducts(page, limit, search);
            setProducts(data.products);
            setListPage(data);
        };

        fetchData();
    }, [page, search]);

    const totalPages = listPage
        ? Math.ceil(listPage.total / limit)
        : 0;

    return (
        <div>
            <SearchBar setSearch={setSearch} setPage={setPage} />

            <div className={styles.container}>
                {products.length > 0 ? (
                    products.map((item) => (
                        <div key={item.id} className={styles.productCard}>
                            <h2>{item.title}</h2>
                            <p>{item.description}</p>
                            <img src={item.images[0]} />
                            <p>R$ {item.price}</p>
                        </div>
                    ))
                ) : (
                    <p>Nenhum produto encontrado</p>
                )}
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
                    onClick={() => setPage(page + 1)}
                >
                    Próxima
                </button>
            </div>
        </div>
    );
};