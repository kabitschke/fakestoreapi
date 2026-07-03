export const getProducts = async (
    page: number,
    limit = 30
) => {
    const skip = (page - 1) * limit;

    const res = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
    );

    if (!res.ok) {
        throw new Error("Erro ao buscar produtos");
    }

    return res.json();
};

const api1 = 'https://fakestoreapi.com/products';
const api2 = 'https://dummyjson.com/products';
//const url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

