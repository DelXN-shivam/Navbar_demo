// globalData.js
export const getGlobalData = async () => {
    try {
        const getCategories = async () => {
            const res = await fetch('http://localhost:3000/api/category', {
                cache: 'default',
            });
            if (!res.ok) throw new Error('Failed to load categories');
            return res.json();
        };

        const getProducts = async () => {
            const res = await fetch('http://localhost:3000/api/product', {
                cache: 'default',
            });
            if (!res.ok) throw new Error('Failed to load products');
            return res.json();
        };

        const categories = await getCategories();
        const products = await getProducts();

        return { categories, products };
    } catch (error) {
        console.error("Error fetching global data:", error);
        return { categories: [], products: [] }; // Return fallback data
    }
};

// globalDats Products
export const getGlobalDataProducts = async () => {
    try {
        const getProducts = async () => {
            const res = await fetch('http://localhost:3000/api/product', {
                cache: 'default',
            });
            if (!res.ok) throw new Error('Failed to load products');
            return res.json();
        };

        const products = await getProducts();

        return { products };
    } catch (error) {
        console.error("Error fetching global data:", error);
        return { products: [] }; // Return fallback data
    }
};
// globalData Categories
export const getGlobalDataCategories = async () => {
    try {
        const getCategories = async () => {
            const res = await fetch('http://localhost:3000/api/category', {
                cache: 'default',
            });
            if (!res.ok) throw new Error('Failed to load categories');
            return res.json();
        };

        const categories = await getCategories();

        return { categories };
    } catch (error) {
        console.error("Error fetching global data:", error);
        return { categories: [] }; // Return fallback data
    }
};
