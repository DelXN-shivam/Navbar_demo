'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CldImage, CldUploadWidget } from 'next-cloudinary';

const AddProductDialog = ({ isOpen, onClose, categories }) => {

  var data = categories;

  const titles = data.categories.map(item => item.title);
  // console.log(titles);

  const options = titles.map((title, index) => (
    <option key={index} value={title}>{title}</option>
  ));

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // State to store the selected category
  // const [selectedImage, setSelectedImage] = useState(null); // State to store the selected image
  const [publicId, setPublicId] = useState(""); // State to store the public ID of the uploaded image

  const UploadImage = () => {
    return (
      <CldUploadWidget uploadPreset='metatectmind_test' onSuccess={({ event, info }) => {

        if (event === 'success') {
          console.log(info?.public_id);

          setPublicId(info?.public_id);
        }
      }}>
        {({ open }) => (
          <div onClick={() => open()} className='p-2 bg-orange-400 items-center justify-center'>
            <h2 className=''>Upload Image</h2>
          </div>
        )}
      </CldUploadWidget>
    );
  }


  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const imageUrl = URL.createObjectURL(file);
  //     setSelectedImage(imageUrl); // Set the selected image URL
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title) {
      alert("Product name is required");
      return;
    }

    if (!selectedCategory || selectedCategory === "Choose a Category") {
      alert("Please select a category");
      return;
    }

    if (!publicId) {
      alert("Please upload an image");
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/product', {
        method: 'POST',
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          image: publicId, // Ensure the image is included
          category: selectedCategory,
        }),
      });

      if (res.ok) {
        window.location.reload();
        alert("Sub-Product created successfully");
        resetFields();
        onClose();
      } else {
        const error = await res.json();
        alert(error.message || "Failed to add product");
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred while adding the product");
    }
  };

  const resetFields = () => {
    setTitle("");
    setDescription("");
    setSelectedCategory("");
    // setSelectedImage(null);
  };

  const handleCancel = () => {
    resetFields(); // Clear fields when the cancel button is clicked
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg text-slate-600 font-semibold mb-4">Add New Sub-Product</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label htmlFor="category" className="block text-sm font-medium text-gray-500 dark:text-black">
            Select Category
          </label>
          <select
            id="category"
            className="block w-full p-3 text-sm text-gray-800 border border-black rounded-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)} // Update state when category changes
          >
            <option>Choose a Product</option>
            {/* <option>United States</option>
            <option>Canada</option>
            <option>France</option>
            <option>Germany</option> */}
            {options}
          </select>

          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="border border-slate-500 px-4 py-2 rounded-sm w-full text-black"
            type="text"
            placeholder="Sub-Product Name"
          />
          <input
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="border border-slate-500 px-4 py-2 rounded-sm w-full text-black"
            type="text"
            placeholder="Sub-Product Description"
          />

          {/* <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-44 border-2 border-gray-300 border-dashed rounded-sm cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="w-full h-full object-contain rounded-sm"
                />
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG or JPG (MAX. 800x400px)</p>
                </div>
              )}
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                accept="image/png, image/jpeg"
                onChange={handleImageChange}
              />
            </label>
          </div> */}

          <UploadImage />

          <>
            {publicId && <CldImage src={publicId} alt={publicId} width={"300"} height={"180"} />}
          </>


          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={handleCancel}
              className="text-gray-600 px-4 py-2 border border-gray-400 rounded-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-white px-4 py-2 bg-green-400 rounded-sm"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductDialog;
