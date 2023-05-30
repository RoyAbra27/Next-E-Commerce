'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import shopValidation from '@/validation/shopValidation';
import { CldImage } from 'next-cloudinary';
import useCloudinary from '@/hooks/useCloudinary';
import { useAuth } from '@clerk/nextjs';
export default function CreateShop({ refresh }: { refresh: () => void }) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: joiResolver(shopValidation.create.frontend()) });
  const { userId } = useAuth();
  const [loading, setLoading] = useState(false);
  const {
    uploadImage: { getUrlSrc, handleFileChange },
  } = useCloudinary();
  console.log(errors);
  const onSub = async (bodyData: any) => {
    setLoading(true);
    console.log(bodyData);
    const urlCoverImage =
      (await getUrlSrc(bodyData.coverImage[0])) + ' ' + userId;
    const urlLogo = (await getUrlSrc(bodyData.logo[0])) + ' ' + userId;
    bodyData.coverImage = urlCoverImage;
    bodyData.logo = urlLogo;
    createShop(bodyData);
    // 1. hash url
    // 2. create shop with url
    //? to update cover image shop
    // first check if url end with userId on the user is session
  };

  async function createShop(bodyData: {
    shopName: string;
    shopDescription: string;
    logo: string | null;
    coverImage: string | null;
  }) {
    try {
      const data = await fetch('/api/shop/create-shop', {
        method: 'POST',
        body: JSON.stringify({
          name: bodyData.shopName,
          description: bodyData.shopDescription,
          logo: bodyData.logo,
          coverImage: bodyData.coverImage,
        }),
      });

      const res = await data.json();
      if (res.status === 'success') refresh();
      console.log(res);
      setLoading(false);
    } catch (err) {
      alert(err);
      console.log(err);
      setLoading(false);
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
            Shop Name
            {/* <CldImage width="600" height="600" src="test Folder/s4geaby6rzvhwmilngzr
" alt="<Alt Text>" /> */}
          </label>
          <input
            {...register('shopName')}
            type="text"
            className="border border-gray-300 p-2 rounded-md"
          />
          {errors.shopName && (
            <p className="text-red-500">{errors.shopName.message as string}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-gray-700">Shop Description</label>
          <textarea
            {...register('shopDescription')}
            className="border border-gray-300 p-2 rounded-md"
          />
          {errors.shopDescription && (
            <p className="text-red-500">
              {errors.shopDescription.message as string}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-gray-700">Logo</label>
          <input
            {...register('logo')}
            type="file"
            className="border border-gray-300 p-2 rounded-md"
          />
          {errors.logo && (
            <p className="text-red-500">{errors.logo.message as string}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-gray-700">Cover Image</label>
          <input
            {...register('coverImage')}
            type="file"
            className="border border-gray-300 p-2 rounded-md"
          />
          {errors.coverImage && (
            <p className="text-red-500">
              {errors.coverImage.message as string}
            </p>
          )}
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

//user_2PedYyT9nL9VLD7QgTPGX5FJH8m
