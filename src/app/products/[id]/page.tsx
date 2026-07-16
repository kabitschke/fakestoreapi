import Link from 'next/link';
import styles from '../[id]/page.module.css';
import { getProductById } from "@/hooks/useFavorites";

type Props = {
    params: {
        id: number;
    };
};

export default async function ProductDetails({ params }: Props) {

    const { id } = await params;
    const product = await getProductById(id);

    return (
        <div className={styles.container}>
            <Link href={'/'}>Voltar</Link>
            <div className={styles.card}>
                <h1>{product.title}</h1>
                <img src={product.thumbnail} alt={product.title} />
                <p>{product.description}</p>
                <p>Categoria: {product.category}</p>
                <p>Preço: R$ {product.price}</p>
                <p>Rating: {product.rating}</p>
            </div>

        </div>
    );
}