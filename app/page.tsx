"use client"
import Link from "next/link";
import React, { useEffect } from "react";
import UploadForm from "./components/test/cloudinary";

const Home = async () => {
 


  return (
    <div className="">
      <div className="bg-cover bg-center-center  shadow-md h-[60vh] bg-[url(https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/12/19/15/istock-463173435.jpg)]"></div>
      <UploadForm />
      <Link href={"/shops"}>shops</Link>
    </div>
  );
};

export default Home;
