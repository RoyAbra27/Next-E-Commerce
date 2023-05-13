'use client';

import { useEffect, useState } from 'react';
import CreateShop from '../components/shop/CreateShop';
import ShopSection from '../components/shop/Shops';
import Link from 'next/link';

export interface Shop {
  name: string;
  description: string;
  logo: string;
  owner_id: string;
}
const PostPage = () => {
  async function getShops() {
    try {
      const res = await fetch('/api/shop');

      const data = (await res.json()) as Shop[];

      setShops(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  const [shops, setShops] = useState<Shop[]>([]);

  useEffect(() => {
    getShops();
  }, []);
  return (
    <div>
      <Link href={'/'}> Home</Link>
      <h1 className="text-[2em]">All shops</h1>
      <CreateShop getShops={getShops} />
      <ShopSection shops={shops} />
    </div>
  );
};

export default PostPage;
