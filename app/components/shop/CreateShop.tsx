"use client";
import React, { useState } from "react";

export default function CreateShop({createShopHandler}:{createShopHandler:()=>void}) {
  const [shopName, setShopName] = useState<string>("");
  const [shopDescription, setShopDescription] = useState<string>("");
  const [logo, setlogo] = useState<string>("");
  const [coverImage, setCoverImage] = useState<string>("");
  async function createShop(e: React.FormEvent) {

    try{
      e.preventDefault();
      const data = await fetch("/api/shop/create-shop", {
        method: "POST",
        body: JSON.stringify({
          name: shopName,
          description: shopDescription,
          logo: logo,
          coverImage: coverImage,
        }),
      });

      const resp = await data.json();
      console.log(resp);
      createShopHandler()
    }catch(err){
      console.log(err)  
    }
  }

  return (
    <div>
      <form onSubmit={createShop} className="py-12">
        <input
          type="text"
          value={shopName}
          className="border-2 border-black rounded-md block"
          placeholder="ShopName"
          onChange={(e) => setShopName(e.target.value)}
        />
        <input
          type="text"
          value={shopDescription}
          className="border-2 border-black rounded-md block"
          placeholder="ShopDescription"
          onChange={(e) => setShopDescription(e.target.value)}
        />
        <input
          type="text"
          value={logo}
          className="border-2 border-black rounded-md block"
          placeholder="logo"
          onChange={(e) => setlogo(e.target.value)}
        />
        <input
          type="text"
          value={coverImage}
          className="border-2 border-black rounded-md block"
          placeholder="cover"
          onChange={(e) => setCoverImage(e.target.value)}
        />
        <button
          type="submit"
          className="bg-teal-700 text-black font-medium py-2 px-4 rounded-md"
        >
          Create Your Shop!
        </button>
      </form>
    </div>
  );
}

//user_2PedYyT9nL9VLD7QgTPGX5FJH8m
