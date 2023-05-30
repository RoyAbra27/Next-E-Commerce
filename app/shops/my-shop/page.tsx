"use client";
import CreateShop from "@/app/components/shop/CreateShop";
import useShop from "@/hooks/useShop";
import React, { useEffect, useState } from "react";
import Container from "@/app/components/container/container";
import ShopThemeProvider from "./components/shopThemeProvider";

const MyShop = () => {
  const { fetchMyShop, loading, shop } = useShop();

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
            <Container>
              <ShopThemeProvider coverImage={shop.coverImage as string}>
                <p className="text-black">dasdsa</p>

              </ShopThemeProvider>
            </Container>
          ) : (
            <CreateShop refresh={fetchMyShop} />
          )}
        </>
      )}
    </div>
  );
};

export default MyShop;
