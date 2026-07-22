'use client'
import styles from '@/app/page.module.css';
import { useEffect, useState } from "react";
import { getProducts } from "@/hooks/useFavorites";
import { SearchBar } from "@/components/SearchBar";
import { Product, ProductsResponse } from "@/types/product";
import { CategoryFilter } from "@/components/CategoryFilter";
import Link from "next/link";
import { Carrot, Heart, ShoppingCart } from "lucide-react";
import { Handbag } from 'lucide-react';
import { Footer } from '@/components/Footer';


export default function Home() {
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
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Handbag size={20} className={styles.bag} />
          <div>Shop<span style={{ color: '#2D6DE6' }}>Hub</span></div>
        </div>

        <SearchBar setSearch={setSearch} setPage={setPage} />

        <div className={styles.actions}>


          <div className={styles.favoritesContainer}>
            <div className={styles.itemFavoritos}>
              <Heart size={20} className={styles.heartFavorites} />
              <div>
                Favoritos
              </div>
            </div>

            <div className={styles.totalFavorites}>
              {favorites.length}
            </div>
          </div>


          <div className={styles.cartContainer}>
            <div className={styles.itemCart}>
              <ShoppingCart size={20} className={styles.cart} />
              <div>
                Carrinho
              </div>
            </div>

            <div className={styles.totalCart}>
              0
            </div>
          </div>

        </div>
      </header>


      <div className={styles.container}>

        <CategoryFilter setCategory={setCategory} />




        <div className={styles.containerProduto}>
          {products.length > 0 ? (
            products.map((item) => (
              <div key={item.id} className={styles.productCard}>
                <div className={styles.heartArea}>

                  <Heart
                    size={14}
                    onClick={() => toggleFavorite(item.id)}
                    className={`${styles.heart} ${favorites.includes(item.id) ? styles.activeHeart : ""
                      }`}
                  />
                </div>

                <Link href={`/products/${item.id}`} className={styles.link}>


                  <img src={item.images[0]} />
                  <p className={styles.category}>{item.category}</p>
                  <h2 className={styles.title}>{item.title}</h2>
                  <p className={styles.price}>R$ {item.price}</p>
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

      <Footer />
    </>


  );
}