"use client";
import CreateShop from "@/app/components/shop/CreateShop";
import { shopType } from "@/types/shop/shop";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const MyShop = () => {
  const [loading, setLoading] = useState(true);
  const [shop, setShop] = useState<shopType|null>(null);
  const fetchMyShop = async () => {
    setLoading(true);
    const response = await fetch("/api/shop/my-shop");
    const data = await response.json() ;
    if (data.isShop) {
      setShop(data.myShop);
    }
    console.log(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchMyShop();
  }, []);
  return <div>{loading ? <h1>Loading...</h1> : <>
  {shop?
  <div>
    <img src={shop.coverImage as string} width={'100%'}  alt="" />
    <img src={shop.logo as string} width={'100%'}  alt="" />
  </div>:<CreateShop refresh={fetchMyShop}/>}
  
  </>}</div>;
};

export default MyShop;


