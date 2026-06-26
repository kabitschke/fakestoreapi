'use client'
import styles from '@/components/SearchBar.module.css';
import { Products } from '@/types/product';
import { useState } from 'react';


type Props = {
    products: Products[];
    setFiltered: (products: Products[]) => void;
};

export const SearchBar = ({ products, setFiltered }: Props) => {

    const [searchValue, setSearchValue] = useState('');



    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const result = products.filter(item =>
                item.title.toLowerCase().includes(searchValue.toLowerCase())
            );

            setFiltered(result);
        }
    };

    return (

        <div>
            <div className={styles.areaInput}>
                <input
                    type="text"
                    placeholder='Busca'
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={handleSearch}
                />

            </div>

            {/* {
                query.trim() !== '' && (
                    busca.length > 0 ? (
                        busca.map((product) => (
                            <div key={product.id} className={styles.productCard}>
                                <h2 className={styles.title}>{product.title}</h2>
                                <p className={styles.description}>{product.description}</p>
                                <p className={styles.category}>{product.category}</p>
                                <img src={product.image} alt={product.title} />
                                <p className={styles.price}>R$ {product.price} </p>
                            </div>
                        ))
                    ) : (
                        <p>Nenhum produto encontrado</p>
                    )
                )
            } */}


        </div>


    )
}