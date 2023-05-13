'use client';
import Link from 'next/link';
import React from 'react';

const Home = async () => {
  return (
    <div className="p-5">
      <h1>Home</h1>
      <Link href={'/shops'}>shops</Link>
    </div>
  );
};

export default Home;
