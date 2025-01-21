'use client';

import React, { useState } from 'react';

const CategorySelect = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [categories, setCategories] = useState([
        { value: 'US', label: 'United States' },
        { value: 'CA', label: 'Canada' },
        { value: 'FR', label: 'France' },
        { value: 'DE', label: 'Germany' },
    ]);

    // Handle change in the selected category
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    // Handle change in the new category input
    const handleNewCategoryChange = (e) => {
        setNewCategory(e.target.value);
    };
    return (
        <div>
            <select
                id="category"
                className="block w-full p-3 text-sm text-gray-800 border border-black rounded-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                value={selectedCategory}
                onChange={handleCategoryChange}
            >
                <option value="">Choose a Category</option>
                {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                        {category.label}
                    </option>
                ))}
            </select>

            <div className="mt-4">
                <input
                    type="text"
                    value={newCategory}
                    onChange={handleNewCategoryChange}
                    className="border border-slate-500 px-4 py-2 rounded-sm w-full text-black"
                    placeholder="Add a new category"
                />
                <button
                    type="button"
                    onClick={handleAddCategory}
                    className="mt-2 text-white px-4 py-2 bg-blue-500 rounded-sm"
                >
                    Add Category
                </button>
            </div>

            <p className="mt-4">Selected Category: {selectedCategory}</p>
        </div>
    );
};

export default CategorySelect;