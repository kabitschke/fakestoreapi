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
        <div style={{ padding: "20px" }}>
            <h1>{product.title}</h1>

            <img src={product.thumbnail} alt={product.title} />

            <p>{product.description}</p>
            <p>Categoria: {product.category}</p>
            <p>Preço: R$ {product.price}</p>
            <p>Rating: {product.rating}</p>
        </div>
    );
}