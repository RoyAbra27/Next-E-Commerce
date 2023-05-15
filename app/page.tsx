'use client';
import Link from 'next/link';
import React from 'react';

const Home = async () => {
  return (
    <div className="">
      <div className='bg-cover shadow-md h-[60vh] bg-[url(https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/12/19/15/istock-463173435.jpg)]'>
s
      </div>
      <Link href={'/shops'}>shops</Link>
    </div>
  );
};

export default Home;
