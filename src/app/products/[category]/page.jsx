"use client";

import React, { useEffect, useState } from "react";
import ProductList from '../../components/ProductList'

const ProductsPage = (category) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [extractedCategory, setExtractedCategory] = useState("");

  // Extract category
  useEffect(() => {
    const extractCategory = async (data) => {
      if (data.params && typeof data.params === "object") {
        const resolvedParams = await data.params; // Resolve if it's a Promise
        return decodeURIComponent(resolvedParams.category); // Extract and decode category
      }
      return null; // Return null if category is not available
    };

    // Extract the category and update state
    extractCategory(category).then((resolvedCategory) => {
      setExtractedCategory(resolvedCategory);
    });
  }, [category]);

  // Fetch products
  useEffect(() => {
    if (!extractedCategory) return; // Wait until the category is resolved

    const fetchProducts = async () => {
      try {
        const url = `http://localhost:3000/api/product?category=${encodeURIComponent(extractedCategory)}`;

        const res = await fetch(url, {
          cache: "default",
        });

        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        setProducts(data.products); // Assuming the API response includes a `products` array
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [extractedCategory]);

  if (loading) {
    return <div className="text-center text-lg font-bold">Loading...</div>;
  }

  return (
    <div>
      <ProductList products={products} extractedCategory={extractedCategory}/>
    </div>
  );
};

export default ProductsPage;
