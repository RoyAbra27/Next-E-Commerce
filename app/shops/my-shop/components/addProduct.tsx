"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import shopValidation from "@/validation/shopValidation";
import { CldImage } from "next-cloudinary";
import useCloudinary from "@/hooks/useCloudinary";
import { useAuth } from "@clerk/nextjs";
import useShop from "@/hooks/useShop";
export default function AddProduct() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {userId} = useAuth()
  const [loading, setLoading] = useState(false)
  const {
    uploadImage: { getUrlSrc, handleFileChange },
  } = useCloudinary();
  console.log(errors);
  const onSub = async (bodyData: any) => {
    setLoading(true)
    console.log(bodyData);
    // addProduct(bodyData)
    // 1. hash url
    // 2. create shop with url
    //? to update cover image shop
    // first check if url end with userId on the user is session 
  };
  const {shop} = useShop()
  async function addProduct(bodyData: {
    name: string;
    description?: string;
    price: number;
    images?: string[];
    category_id?: number[];
    }) {

    try {
      const data = await fetch("/api/shop/create-shop", {
        method: "POST",
        body: JSON.stringify(bodyData),
      });

      const res = await data.json();
     
      console.log(res);
      setLoading(false)
    } catch (err) {
      alert(err);
      console.log(err);
      setLoading(false)

    }
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSub)}
        className="space-y-4 w-full max-w-md mx-auto mt-8"
      >
        <div className="flex flex-col">
          <label className="font-medium text-gray-700">
            Name:
            {/* <CldImage width="600" height="600" src="test Folder/s4geaby6rzvhwmilngzr
" alt="<Alt Text>" /> */}
          </label>
          <input
            {...register("name")}
            type="text"
            className="border border-gray-300 p-2 rounded-md"
          />

        </div>
        <div className="flex flex-col">
          <label className="font-medium text-gray-700">Description</label>
          <textarea
            {...register("description")}
            className="border border-gray-300 p-2 rounded-md"
          />
     
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-gray-700">Price</label>
          <input
            {...register("price")}
            type="number"
            defaultValue={0}
            className="border border-gray-300 p-2 rounded-md text-center"
          />
     
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-gray-700">Cover Image</label>
          <input
            {...register("coverImage")}
            type="file"
            className="border border-gray-300 p-2 rounded-md"
          />
       
        </div>
        <button className="bg-blue-600 text-white py-2 px-4 rounded-md">
          Submit
        </button>
      </form>

      {/* <input onChange={handleFileChange} type="file" />
      <button
        onClick={async () => {
          const url = await getUrlSrc();
          console.log(url);
        }}
      >
        Upload Image
      </button> */}
    </div>
  );
}