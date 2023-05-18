"use client";
import React, { useState } from "react";
import {useForm} from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi';
import shopValidation from "@/validation/shopValidation";
import { CldUploadButton } from "next-cloudinary";
export default function CreateShop({ refresh }: { refresh: () => void }) {
  const {register,reset,handleSubmit,formState:{errors}} = useForm({resolver:joiResolver(shopValidation.create.frontend())})

  console.log(errors)
    const onSub = (bodyData:any) => {
      console.log(bodyData)
      createShop(bodyData)

    }

  async function createShop(bodyData:{
    shopName: string;
    shopDescription: string;
    logo: string | null;
    coverImage: string | null;
  }) {
    try {
      const data = await fetch("/api/shop/create-shop", {
        method: "POST",
        body: JSON.stringify({
          name: bodyData.shopName,
          description: bodyData.shopDescription,
          logo: bodyData.logo,
          coverImage: bodyData.coverImage,
        }),
      });

      const res = await data.json();
      if (res.status === "success") refresh();
      console.log(res);
    } catch (err) {
      alert(err)
      console.log(err);
    }
  }

  return (
    <div>
     <form onSubmit={handleSubmit(onSub)} className="space-y-4 w-full max-w-md mx-auto mt-8">
      <div className="flex flex-col">
        <label  className="font-medium text-gray-700">
          Shop Name
        </label>
        <input
        {...register('shopName')}
          type="text"
          className="border border-gray-300 p-2 rounded-md"
        />
        {errors.shopName && <p className="text-red-500">{errors.shopName.message as string}</p>}
      </div>
      <div className="flex flex-col">
        <label  className="font-medium text-gray-700">
          Shop Description
        </label>
        <textarea
        {...register('shopDescription')}
          className="border border-gray-300 p-2 rounded-md"
        />
        {errors.shopDescription && <p className="text-red-500">{errors.shopDescription.message as string}</p>}
      
      </div>
      <div className="flex flex-col">
        <label  className="font-medium text-gray-700">
          Logo
        </label>
        <input
          {...register('logo')}
          type="text"
          className="border border-gray-300 p-2 rounded-md"
        />
        {errors.logo && <p className="text-red-500">{errors.logo.message as string}</p>}
      </div>
      <div className="flex flex-col">
        <label  className="font-medium text-gray-700">
          Cover Image
        </label>
        <input
          {...register('coverImage')}
          type="file"
          className="border border-gray-300 p-2 rounded-md"
        />
        {errors.coverImage && <p className="text-red-500">{errors.coverImage.message as string}</p>}
      </div>
      <button
        className="bg-blue-600 text-white py-2 px-4 rounded-md"
      >
        Submit
      </button>
    </form>

    </div>
  );
}

//user_2PedYyT9nL9VLD7QgTPGX5FJH8m
