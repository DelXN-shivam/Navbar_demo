'use client';

import React, { useState } from 'react';
import AddTopicDialog from '../addCategory/page';
import AddProductDialog from '../addProduct/page';

const Navbar = ({ categories, products }) => {
    var categoryData = categories;
    var productData = products;

    const categorizedProducts = productData.products.reduce((acc, product) => {
        const { category } = product;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(product);
        return acc;
    }, {});

    const [hoveredCategory, setHoveredCategory] = useState(null);
    const [dropdownPosition, setDropdownPosition] = useState(null);
    const [dropdownStates, setDropdownStates] = useState({});
    const [isDropdown1Open, setIsDropdown1Open] = useState(false)
    const [isSubTypeOpen, setIsSubTypeOpen] = useState(false)

    const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
    const openCategoryDialog = () => setIsCategoryDialogOpen(true);
    const closeCategoryDialog = () => setIsCategoryDialogOpen(false);

    const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
    const openProductDialog = () => setIsProductDialogOpen(true);
    const closeProductDialog = () => setIsProductDialogOpen(false);

    const handleMouseEnter = (dropdownId) => {
        setDropdownStates((prevState) => ({
            ...prevState,
            [dropdownId]: true,
        }));
    };

    const handleMouseLeave = (dropdownId) => {
        setDropdownStates((prevState) => ({
            ...prevState,
            [dropdownId]: false,
        }));
    };

    return (
        <div>
            <nav className="flex justify-center">
                <ul className="flex flex-wrap items-center font-medium text-sm">
                    <li className="p-4 lg:px-8">
                        <button
                            onClick={openCategoryDialog}
                            className="text-white hover:text-gray-300 text-xl"
                        >
                            Add Product
                        </button>
                    </li>
                    <li className="p-4 lg:px-8">
                        <button
                            onClick={openProductDialog}
                            className="text-white hover:text-gray-300 text-xl"
                        >
                            Add Sub-Product
                        </button>
                    </li>
                    {/* Dropdown 1 */}
                    <li
                        className="p-4 lg:px-8 relative flex items-center space-x-1"
                        // onMouseEnter={() => handleMouseEnter('dropdown1')}
                        // onMouseLeave={() => handleMouseLeave('dropdown1')}
                        onMouseEnter={() => setIsDropdown1Open(true)}
                        onMouseLeave={() => {
                            setIsDropdown1Open(false);
                            setIsSubTypeOpen(false);
                        }
                        }

                    >
                        <a
                            className="text-white hover:text-gray-300 text-xl"
                            href="#"

                        // aria-expanded={dropdownStates['dropdown1'] || false}
                        >
                            DropMenu 1
                        </a>
                        {isDropdown1Open && (
                            <ul
                                className="origin-top-right absolute top-full left-1/2 -translate-x-1/2 min-w-[240px] bg-white border border-slate-200 p-2 rounded-lg shadow-xl"
                                onMouseEnter={() => handleMouseEnter('dropdown1')} // Keep the parent dropdown visible when hovering over nested list
                                onMouseLeave={() => handleMouseLeave('dropdown1')} // Keep the parent dropdown visible when leaving the nested list
                            >
                                {categoryData.categories.map((category) => (
                                    <li
                                        key={category._id}
                                        onMouseEnter={(e) => {
                                            setIsSubTypeOpen(true)
                                            setHoveredCategory(category.title);
                                            const rect = e.target.getBoundingClientRect();
                                            const navbarTop = e.target.closest('nav').getBoundingClientRect().top;
                                            const offsetTop = rect.top - navbarTop;
                                            setDropdownPosition(offsetTop);
                                        }}
                                    // onMouseLeave={() => setHoveredCategory(null)}
                                    >
                                        <a
                                            className="text-slate-800 hover:bg-slate-100 flex items-center p-2"
                                            href={`/products/${category.title}`}
                                        >
                                            <div className='flex-row gap-20 justify-between'>
                                                <span className="whitespace-nowrap">{category.title}</span>
                                                
                                            </div>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {/* Dropdown for Products */}
                        {isDropdown1Open && isSubTypeOpen && hoveredCategory && categorizedProducts[hoveredCategory] && dropdownPosition !== null && (
                            <ul
                                onMouseLeave={() => setIsSubTypeOpen(!isSubTypeOpen)}
                                className="origin-top-right absolute left-40 min-w-[240px] bg-white border border-slate-200 p-2 rounded-lg shadow-xl"
                                style={{
                                    top: dropdownPosition,
                                    paddingLeft: '20px',
                                }}

                            // onMouseEnter={() => handleMouseEnter('dropdown1')}
                            // onMouseLeave={() => handleMouseLeave('dropdown1')}
                            >
                                {categorizedProducts[hoveredCategory].map((product) => (
                                    <li key={product._id} className="mb-1 last:mb-0">
                                        <a
                                            href={`/products/${hoveredCategory}/${product.title}`}
                                            // href={`/products/${hoveredCategory}/${product._id}`}
                                            className="text-slate-800 hover:bg-slate-50 flex items-center p-2 rounded transition-colors duration-200"
                                        >
                                            <span className="whitespace-nowrap justify-between">{product.title}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>

                    {/* <li className="p-4 lg:px-8" >
                        <a className="text-white hover:text-gray-300 text-xl" href="/products" onMouseEnter={() => setIsDropdown1Open(true)} onMouseLeave={() => setIsDropdown1Open(false)}>
                            Products
                        </a>
                    </li> */}

                    {/* Dropdown 2 */}
                    {/* <li
                        className="p-4 lg:px-8 relative flex items-center space-x-1"
                        onMouseEnter={() => handleMouseEnter('dropdown2')}
                        onMouseLeave={() => handleMouseLeave('dropdown2')}
                    >
                        <a
                            className="text-white hover:text-gray-300 text-xl"
                            href="#0"
                            aria-expanded={dropdownStates['dropdown2'] || false}
                        >
                            DropMenu 2
                        </a>
                        {dropdownStates['dropdown2'] && (
                            <ul className="origin-top-right absolute top-full left-1/2 -translate-x-1/2 min-w-[240px] bg-white border border-slate-200 p-2 rounded-lg shadow-xl">
                                <li>
                                    <a
                                        className="text-slate-800 hover:bg-slate-100 flex items-center p-2"
                                        href="#"
                                    >
                                        <span className="whitespace-nowrap">Priority Ratings</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="text-slate-800 hover:bg-slate-50 flex items-center p-2"
                                        href="#"
                                    >
                                        <span className="whitespace-nowrap">Insights</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="text-slate-800 hover:bg-slate-50 flex items-center p-2"
                                        href="#"
                                    >
                                        <span className="whitespace-nowrap">Item Mirror</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="text-slate-800 hover:bg-slate-50 flex items-center p-2"
                                        href="#"
                                    >
                                        <span className="whitespace-nowrap">Support Center</span>
                                    </a>
                                </li>
                            </ul>
                        )}
                    </li> */}


                </ul>
            </nav>

            <AddTopicDialog isOpen={isCategoryDialogOpen} onClose={closeCategoryDialog} />
            <AddProductDialog isOpen={isProductDialogOpen} onClose={closeProductDialog} categories={categories} />
        </div>
    );
};

export default Navbar;









{/* <li
                        className="p-4 lg:px-8 relative flex items-center space-x-1"
                        onMouseEnter={() => handleMouseEnter('dropdown1')}
                        onMouseLeave={() => handleMouseLeave('dropdown1')}
                    >
                        <a
                            className="text-white hover:text-gray-300 text-xl"
                            href="#0"
                            aria-expanded={dropdownStates['dropdown1'] || false}
                        >
                            DropMenu 1
                        </a>
                        <button
                            className="shrink-0 p-1"
                            onClick={(e) => {
                                e.preventDefault();
                                toggleDropdown('dropdown1');
                            }}
                            aria-expanded={dropdownStates['dropdown1'] || false}
                        >
                            <svg
                                className="w-3 h-3 fill-slate-300"
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                            >
                                <path d="M10 2.586 11.414 4 6 9.414.586 4 2 2.586l4 4z" />
                            </svg>
                        </button>
                        {dropdownStates['dropdown1'] && (
                            <ul className="origin-top-right absolute top-full left-1/2 -translate-x-1/2 min-w-[240px] bg-white border border-slate-200 p-2 rounded-lg shadow-xl">
                                {categoryData.categories.map((category) => (
                                    <li key={category._id}>
                                        <a
                                            className="text-slate-800 hover:bg-slate-100 flex items-center p-2"
                                            href={`/products/${category._id}`} // Redirect to category's product page
                                        >
                                            <span className="whitespace-nowrap">{category.title}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li> */}
