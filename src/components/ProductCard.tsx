'use client'
import { useEffect, useState } from "react";
import styles from "@/components/ProductCard.module.css";
import { getProducts } from "@/hooks/useFavorites";
import { SearchBar } from "./SearchBar";
import { Product, ProductsResponse } from "@/types/product";
import { CategoryFilter } from "./CategoryFilter";
import Link from "next/link";

export const ProductCard = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [listPage, setListPage] = useState<ProductsResponse>();
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");

    const limit = 30;

    useEffect(() => {
        const fetchData = async () => {
            const data = await getProducts(page, limit, search, category);
            setProducts(data.products);
            setListPage(data);
        };

        fetchData();
    }, [page, search, category]);

    const totalPages = listPage
        ? Math.ceil(listPage.total / limit)
        : 0;

    return (
        <div>
            <SearchBar setSearch={setSearch} setPage={setPage} />


            <CategoryFilter setCategory={setCategory} />




            <div className={styles.container}>
                {products.length > 0 ? (
                    products.map((item) => (
                        <Link key={item.id} href={`/products/${item.id}`}>
                            <div className={styles.productCard}>
                                <h2>{item.title}</h2>
                                <p>{item.category}</p>
                                <p>{item.description}</p>
                                <img src={item.images[0]} />
                                <p>R$ {item.price}</p>
                            </div>
                        </Link>
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