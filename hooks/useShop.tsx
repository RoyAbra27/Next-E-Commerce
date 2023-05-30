"use client"
import { shopType } from '@/types/shop/shop';
import React, { useState } from 'react'
import useCloudinary from './useCloudinary';

const useShop = () => {
    const { fixImage } = useCloudinary();
    const [loading, setLoading] = useState(true);
    const [shop, setShop] = useState<shopType | null>(null);
    const fetchMyShop = async () => {
      setLoading(true);
      const response = await fetch("/api/shop/my-shop");
      const data = await response.json();
      if (data.isShop) {
        data.myShop.coverImage = fixImage(data.myShop.coverImage);
        data.myShop.logo = fixImage(data.myShop.logo);
        setShop(data.myShop);
      }
      console.log(data);
      setLoading(false);
    };
  

  return {loading,fetchMyShop,shop}
}

export default useShop