export const getProducts = async (
    page: number,
    limit = 30,
    search = "",
    category = ""
) => {
    const skip = (page - 1) * limit;

    let url = "";

    if (search) {
        url = `https://dummyjson.com/products/search?q=${search}&limit=${limit}&skip=${skip}`;
    } else if (category) {
        url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`;
    } else {
        url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
    }

    const res = await fetch(url);

    if (!res.ok) throw new Error("Erro ao buscar produtos");

    return res.json();
};
export const getCategories = async () => {
    const res = await fetch('https://dummyjson.com/products/categories');

    if (!res.ok) {
        throw new Error("Erro ao buscar categorias");
    }
    return res.json();
};

export const getFilterCategories = async (category: string) => {
    const res = await fetch(`https://dummyjson.com/products/category/${category}`);

    if (!res.ok) {
        throw new Error("Erro ao buscar categorias");
    }
    return res.json();
};



const api1 = 'https://fakestoreapi.com/products';
const api2 = 'https://dummyjson.com/products';


