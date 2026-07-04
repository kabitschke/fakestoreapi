export const getProducts = async (
    page: number,
    limit = 30,
    search = ""
) => {
    const skip = (page - 1) * limit;

    const url = search
        ? `https://dummyjson.com/products/search?q=${search}&limit=${limit}&skip=${skip}`
        : `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

    const res = await fetch(url);

    if (!res.ok) {
        throw new Error("Erro ao buscar produtos");
    }

    return res.json();
};

const api1 = 'https://fakestoreapi.com/products';
const api2 = 'https://dummyjson.com/products';


