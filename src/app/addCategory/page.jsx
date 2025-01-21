'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const AddCategoryDialog = ({ isOpen, onClose }) => {
    const [title, setTitle] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title) {
            alert("Category name is required");
            return;
        }

        try {
            const res = await fetch('http://localhost:3000/api/category', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ title }),
            });

            if (res.ok) {
                // router.push('/');
                // router.refresh();
                window.location.reload();
                resetFields();
                onClose();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const resetFields = () => {
        setTitle("");
    };

    //   if (onClose) return null;
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-lg text-slate-600 font-semibold mb-4">Add New Product</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        className="border border-slate-500 px-4 py-2 rounded-sm w-full text-black"
                        type="text"
                        placeholder="Product Name"
                    />

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
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

export default AddCategoryDialog;
