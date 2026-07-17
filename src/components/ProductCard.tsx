'use client'
import { useEffect, useState } from "react";
import styles from "@/components/ProductCard.module.css";
import { getProducts } from "@/hooks/useFavorites";
import { SearchBar } from "./SearchBar";
import { Product, ProductsResponse } from "@/types/product";
import { CategoryFilter } from "./CategoryFilter";
import Link from "next/link";
import { Heart } from "lucide-react";

export const ProductCard = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [listPage, setListPage] = useState<ProductsResponse>();
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [favorites, setFavorites] = useState<number[]>([]);

    const limit = 30;

    useEffect(() => {
        const fetchData = async () => {
            const data = await getProducts(page, limit, search, category);
            setProducts(data.products);
            setListPage(data);
        };

        fetchData();
    }, [page, search, category]);


    useEffect(() => {
        const stored = localStorage.getItem("favorites");
        if (stored) {
            setFavorites(JSON.parse(stored));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (id: number) => {
        if (favorites.includes(id)) {
            // remove dos favoritos
            const updated = favorites.filter(fav => fav !== id);
            //mantenha tudo que NÃO é igual ao id clicado filter(fav => fav !== id)
            setFavorites(updated);
        } else {
            // adiciona aos favoritos
            const updated = [...favorites, id];
            setFavorites(updated);
        }
    };
    const totalPages = listPage
        ? Math.ceil(listPage.total / limit)
        : 0;

    return (
        <div>
            <SearchBar setSearch={setSearch} setPage={setPage} />

            <div className={styles.favorites}>

                <div >
                    <Heart size={20} className={styles.heartFavorites} />
                </div>

                <div>
                    {favorites.length}
                </div>

            </div>



            <CategoryFilter setCategory={setCategory} />




            <div className={styles.container}>
                {products.length > 0 ? (
                    products.map((item) => (
                        <div key={item.id} className={styles.productCard}>

                            <Heart
                                onClick={() => toggleFavorite(item.id)}
                                className={`${styles.heart} ${favorites.includes(item.id) ? styles.activeHeart : ""
                                    }`}
                            />

                            <Link href={`/products/${item.id}`} className={styles.link}>
                                <h2>{item.title}</h2>
                                <p>{item.category}</p>
                                <p>{item.description}</p>
                                <img src={item.images[0]} />
                                <p>R$ {item.price}</p>
                            </Link>
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