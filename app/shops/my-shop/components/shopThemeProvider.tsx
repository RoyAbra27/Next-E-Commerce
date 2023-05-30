"use client";
import { shopType } from "@/types/shop/shop";
import React, { useState } from "react";
import useShop from "@/hooks/useShop";
import CoverImage from "./coverImage";
import Modal from "@/app/components/modal/modal";
import AddProduct from "./addProduct";

const ShopThemeProvider = ({
  children,
  coverImage,
}: {
  children: React.ReactNode;
  coverImage: string | null | undefined;
}) => {
    const [openModalAddProduct, setopenModalAddProduct] = useState(false)
  return (
    <div className="relative">
      <CoverImage coverImage={coverImage as string} />
      <div className="bg-white bg-opacity-80 shadow-2xl rounded-lg h-[40vh] w-[95%] lg:w-[85%] p-5 mx-auto relative bottom-[70px]">
        <div>
          <button onClick={()=>setopenModalAddProduct(!openModalAddProduct)} className=" bg-blue-500 opacity-100 hover:bg-blue-700 text-white  py-2 px-4 rounded-sm">
            Add Product
          </button>
        </div>

        {children}
      </div>
      <Modal setOpen={setopenModalAddProduct} open={openModalAddProduct} >
    <AddProduct />
      </Modal>
    </div>
  );
};

export default ShopThemeProvider as React.FC<{
  children: React.ReactNode;
  coverImage: string | null | undefined;
}>;
