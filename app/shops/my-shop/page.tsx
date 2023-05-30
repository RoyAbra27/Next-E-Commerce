"use client";
import CreateShop from "@/app/components/shop/CreateShop";
import useCloudinary from "@/hooks/useCloudinary";
import { shopType } from "@/types/shop/shop";
import React, { useEffect, useState } from "react";
import {
  CldImage,
  CldOgImage,
  GetCldImageUrl,
  getCldImageUrl,
} from "next-cloudinary";
const MyShop = () => {
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
  useEffect(() => {
    fetchMyShop();
  }, []);
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {shop ? (
            <div className="relative h-[200vh]">
              <div
                style={{
                  zIndex: -1,
                  backgroundImage: `url(${shop.coverImage})`,
                }}
                className=" h-[48vh] lg:h-[100vh]  opacity-60  bg-cover bg-center lg:fixed top-0 left-0 right-0 bottom-0"
              >
              </div>
              <div className="w-[100px] h-[100px]">
                    <img src={shop.logo} alt="ss"  width={'100%'}/>
               </div>
              {/* <img src={shop.coverImage as string} width={'100%'}  alt="" /> */}
              {/* <img src={shop.logo as string} width={'100%'}  alt="" /> */}
            </div>
          ) : (
            <CreateShop refresh={fetchMyShop} />
          )}
        </>
      )}
    </div>
  );
};

export default MyShop;
