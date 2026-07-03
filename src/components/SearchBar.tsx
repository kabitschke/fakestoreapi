'use client'
import styles from '@/components/SearchBar.module.css';
import { Product } from '@/types/product';
import { useState } from 'react';


type Props = {
    products: Product[];
    setFiltered: (products: Product[]) => void;
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



        </div>


    )
}