// Server Component (e.g., NavbarContainer.js)
'use server';

import React from 'react';
import Navbar from './Navbar';
import getGlobaldata from '../globalData';

// const getCategories = async () => {
//     const res = await fetch('http://localhost:3000/api/category', { cache: 'default' });
//     if (!res.ok) {
//         throw new Error('Failed to fetch categories');
//     }
//     return res.json();
// };

const getCategories = async () => {
    try {
        const res = await fetch('http://localhost:3000/api/category', {
            cache: 'default',
        });

        if (!res.ok) {
            console.log('Failed to Load Data.');
        }

        return res.json();
    } catch (error) {
        console.log("Error loading Data.");
    }
}

const getProducts = async () => {
    try {
        const res = await fetch('http://localhost:3000/api/product', {
            cache: 'default',
        });

        if (!res.ok) {
            console.log('Failed to Load Data.');
        }

        return res.json();
    } catch (error) {
        console.log("Error loading Data.");
    }
}

const NavbarContainer = async () => {

    const categories = await getCategories();
    const products = await getProducts();

    return <Navbar categories={categories} products={products} />
    // return <Navbar categories={categories} />
};

export default NavbarContainer;
