'use client'
import { useEffect, useState } from 'react';
import styles from '@/components/CategoryFilter.module.css';
import { getCategories } from '@/hooks/useFavorites';
import { Funnel } from 'lucide-react';

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
            <div className={styles.filterTitle}>
                <Funnel size={20} stroke='#2D6DE6' />
                <h3>Filtro Categoria</h3>

            </div>
            {categories.map((item) => (
                <div key={item.name} className={styles.filter}>
                    <input
                        type="checkbox"
                        checked={selected === item.slug}
                        onChange={() => handleChange(item.slug)}
                    />
                    <label className={styles.label}>
                        {item.name}
                    </label>

                </div>
            ))}

        </div>


    );
};