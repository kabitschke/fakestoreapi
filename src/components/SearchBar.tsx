'use client'
import { useEffect, useState } from 'react';
import styles from '@/components/SearchBar.module.css';

type Props = {
    setSearch: (value: string) => void;
    setPage: (value: number) => void;
};

export const SearchBar = ({ setSearch, setPage }: Props) => {
    const [value, setValue] = useState("");

    useEffect(() => {
        const delay = setTimeout(() => {
            setPage(1);        // volta pra página 1
            setSearch(value);  // dispara busca
        }, 500); // ⏱️ tempo do debounce

        return () => clearTimeout(delay);
    }, [value]);

    return (
        <div className={styles.areaInput}>
            <input
                type="text"
                placeholder="Buscar produto..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
};