'use client'
import { useEffect, useState } from 'react';
import styles from '@/components/CategoryFilter.module.css';
import { getCategories } from '@/hooks/useFavorites';

type Props = {
    setCategory: (value: string) => void;
};

type Categories = {
    slug: string;
    name: string;
    url: string;
}

export const CategoryFilter = ({ setCategory }: Props) => {
    const [categories, setCategories] = useState<Categories[]>([]);
    const [selected, setSelected] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            const data = await getCategories();
            setCategories(data);
        };

        fetchData();
    }, []);

    const handleChange = (value: string) => {
        const newValue = selected === value ? "" : value; // toggle
        setSelected(newValue);
        setCategory(newValue);
    };

    return (
        <div className={styles.container}>
            {categories.map((item) => (
                <label key={item.name}>
                    <input
                        type="checkbox"
                        checked={selected === item.slug}
                        onChange={() => handleChange(item.slug)}
                    />
                    {item.name}
                </label>
            ))}
        </div>
    );
};