'use client';


import React from 'react';
import { CldImage } from 'next-cloudinary';

const ProductList = ({ products, extractedCategory }) => {
  // Filter products based on the extractedCategory
  const filteredProducts = products.filter(
    (product) => product.category === extractedCategory
  );

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold text-gray-400 text-center mb-8">
        Products in <span className="text-blue-500">{extractedCategory}</span>
      </h1>
      {filteredProducts.length > 0 ? (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="rounded-xl overflow-hidden shadow-md bg-white transition transform hover:-translate-y-1 hover:shadow-lg"
            >
              {/* <img
                src={product.image}
                alt={product.title}
                className="h-56 w-full object-cover"
              /> */}


              <CldImage
                width="960"
                height="600"
                src={product.image}
                sizes="100vw"
                alt={product.title}
              />
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  {product.title}
                </h2>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {product.description}
                </p>
                <div className="text-sm text-gray-500">
                  <span className="font-medium">Category:</span> {product.category}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  <span className="font-medium">Created At:</span>{' '}
                  {new Date(product.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">
          No products found in this category.
        </p>
      )}
    </div>
  );
};

export default ProductList;
