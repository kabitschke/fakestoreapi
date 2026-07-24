'use client'
import { useEffect, useState } from 'react';
import styles from '@/components/CategoryFilter.module.css';
import { getCategories } from '@/hooks/useFavorites';
import {
    MirrorRound,
    Shirt,
    Smartphone,
    Lamp,
    Watch,
    Glasses,
    Home,
    Laptop,
    Car,
    Gem,
    ShoppingBag,
    Footprints,
    CookingPot,
    Package,
    SmartphoneIcon,
    MotorbikeIcon,
    Dumbbell,

} from "lucide-react";
import { LucideIcon } from "lucide-react";

type Props = {
    setCategory: (value: string) => void;
};

type CategorySlug = "beauty" | "fragrances" | "furniture" | "clothes" | "electronics" | "groceries"
    | "home-decoration" | "kitchen-accessories" | "laptops" | "mens-shirts" | "mens-shoes" | "mens-watches"
    | "mobile-accessories" | "motorcycle" | "skin-care" | "smartphones" | "sports-accessories"
    | "sunglasses" | "tablets" | "tops" | "vehicle" | "womens-bags" | "womens-dresses"
    | "womens-jewellery" | "womens-shoes" | "womens-watches";

type Categories = {
    slug: CategorySlug;
    name: string;
    url: string;
}

const iconMap = {
    beauty: MirrorRound,
    fragrances: MirrorRound,
    furniture: Lamp,
    clothes: Shirt,
    electronics: Smartphone,
    smartphones: Smartphone,
    groceries: Package,
    "home-decoration": Home,
    "kitchen-accessories": CookingPot,
    laptops: Laptop,
    "mens-shirts": Shirt,
    "mens-watches": Watch,
    sunglasses: Glasses,
    tablets: Smartphone,
    tops: Shirt,
    vehicle: Car,
    "womens-bags": ShoppingBag,
    "womens-dresses": Shirt,
    "womens-jewellery": Gem,
    "womens-shoes": Footprints,
    "womens-watches": Watch,
    "mens-shoes": Footprints,
    "mobile-accessories": SmartphoneIcon,
    "motorcycle": MotorbikeIcon,
    "skin-care": MirrorRound,
    "sports-accessories": Dumbbell
};

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


    //const Icon = iconMap[item.slug];


    return (
        <div className={styles.wrapper}>
            <div className={styles.containerMobile}>
                {categories.map((item) => {
                    const Icon = iconMap[item.slug] ?? Package;

                    return (
                        <div
                            key={item.name}
                            className={styles.filter}
                            onClick={() => handleChange(item.slug)}
                        >
                            <div className={styles.areaCategory}>
                                <div className={styles.areaIcon}>
                                    <Icon size={16} />
                                </div>
                                {item.name}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );


}