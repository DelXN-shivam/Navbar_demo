'use client';

import React, { useState, useEffect } from 'react';
import { CldImage } from 'next-cloudinary';
import { getGlobalDataProducts } from '../../../globalData';

const ProductDetails = (props) => {
  const [params, setParams] = useState(null); // Store unwrapped params
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Unwrap params using React.use()
  useEffect(() => {
    const unwrapParams = async () => {
      const unwrappedParams = await props.params;
      setParams(unwrappedParams);
    };

    unwrapParams();
  }, [props.params]);

  // Fetch product details when params are ready
  useEffect(() => {
    if (!params) return; // Wait for params to be unwrapped

    const fetchData = async () => {
      try {
        const { category, product } = params;
        const decodedProduct = decodeURIComponent(product);

        const { products } = await getGlobalDataProducts();
        const foundProduct = products.products.find((p) => p.title === decodedProduct);
        setProductDetails(foundProduct);
      } catch (error) {
        console.error('Error fetching product data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Product Details</h1>

        {productDetails ? (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Product Image */}
            <div className="w-full lg:w-1/2">
              <CldImage
                width="960"
                height="600"
                src={productDetails.image}
                sizes="100vw"
                alt={productDetails.title}
                className="rounded-lg shadow-sm"
              />
            </div>

            {/* Product Info */}
            <div className="w-full lg:w-1/2">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {productDetails.title}
              </h2>
              <p className="text-gray-600 text-sm mb-2">
                <span className="font-semibold">Category:</span> {productDetails.category}
              </p>
              <p className="text-gray-700 mb-6">
                <span className="font-semibold">Description:</span> {productDetails.description}
              </p>
              <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition">
                Add to Cart
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-red-500 font-semibold">
            Product not found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
