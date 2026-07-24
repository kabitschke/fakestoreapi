'use client'
import { useEffect, useState, useRef } from 'react';
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
    ChevronLeft,
    ChevronRight,
    SmartphoneIcon,
    MotorbikeIcon,
    Dumbbell,
} from "lucide-react";


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

    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (!scrollRef.current) return;

        const { current } = scrollRef;

        const scrollAmount = 200;

        current.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
    };





    return (
        <div className={styles.wrapper}>

            {/* botão esquerdo */}
            <button
                className={`${styles.navButton} ${styles.left}`}
                onClick={() => scroll("left")}
            >
                <ChevronLeft size={18} />
            </button>

            {/* scroll */}
            <div ref={scrollRef} className={styles.containerMobile}>
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

            {/* botão direito */}
            <button
                className={`${styles.navButton} ${styles.right}`}
                onClick={() => scroll("right")}
            >
                <ChevronRight size={18} />
            </button>

        </div>
    );
};