import Link from 'next/link';
import styles from '../[id]/page.module.css';
import { getProductById } from "@/hooks/useFavorites";
import { Star } from 'lucide-react';

type Props = {
    params: {
        id: number;
    };
};

export default async function ProductDetails({ params }: Props) {

    const { id } = await params;
    const product = await getProductById(id);

    const maxStars = 5;
    const rating = product.rating;

    return (
        <div className={styles.container}>
            <Link href={'/'}>Voltar</Link>
            <div className={styles.card}>
                <h1>{product.title}</h1>
                <img src={product.thumbnail} alt={product.title} />
                <p>{product.description}</p>
                <p>Categoria: {product.category}</p>
                <p>Preço: R$ {product.price}</p>
                {Array.from({ length: maxStars }, (_, index) => (
                    <Star
                        key={index}
                        size={20}
                        fill={index < product.rating ? "gold" : "none"}
                        color="gold"
                    />
                ))}

            </div>

        </div>
    );
}