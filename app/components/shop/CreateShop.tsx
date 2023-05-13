'use client';
import React, { useState } from 'react';

export default function CreateShop({ getShops }: { getShops: () => void }) {
  const [shopName, setShopName] = useState<string>('');
  const [shopDescription, setShopDescription] = useState<string>('');
  async function createShop(e: React.FormEvent) {
    e.preventDefault();
    const data = await fetch('/api/shop/create-shop', {
      method: 'POST',
      body: JSON.stringify({ name: shopName, description: shopDescription }),
    });

    if (data) {
      getShops();
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