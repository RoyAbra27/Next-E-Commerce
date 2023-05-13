'use client';

import { Shop } from '@/app/shops/page';
export default function ShopSection({ shops }: { shops: Shop[] }) {
  return (
    <div>
      {shops?.map((shop) => (
        <div key={shop.owner_id} className="text-lg py-6 bg-red-400 w-fit ">
          <h1>{shop.name}</h1>
          <p>{shop.description}</p>
        </div>
      ))}
    </div>
  );
}
