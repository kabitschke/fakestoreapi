import styles from "@/components/ProductCard.module.css";
import { getProducts } from "@/hooks/useFavorites";


export const ProductCard = async () => {

    const products = await getProducts();

    return (
        <>
            {
                products.map((product) => (
                    <div key={product.id} className={styles.productCard}>
                        <h2 className={styles.title}>{product.title}</h2>
                        <p className={styles.description}>{product.description}</p>
                        <p className={styles.category}>{product.category}</p>
                        <img src={product.image} alt={product.title} />
                        <p className={styles.price}>R$ {product.price} </p>
                    </div>
                ))
            }
        </>
    )
}