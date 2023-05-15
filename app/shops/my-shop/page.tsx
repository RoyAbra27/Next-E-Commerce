"use client"

import CreateShop from '@/app/components/shop/CreateShop'
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
const MyShop = () => {
  const [loading, setLoading] = useState(true)
  const [createShop, setCreateShop] = useState(false)

  const createShopHandler:()=>void = () => {
    setCreateShop(true)
  }
  const {user} = useUser()
  const isShop = user?.publicMetadata.shop as boolean

  useEffect(() => {
    if (user?.publicMetadata.shop !== undefined) {
      setLoading(false)
    }
  }, [user?.publicMetadata.shop,user,createShop])
    console.log(isShop)
    console.log(loading)
  return (
    <div>
      {loading ? <div>Loading...</div>:
       <div>
        {isShop ? <div>Shop</div> :  <CreateShop createShopHandler={createShopHandler}/>}
        </div>}
     
    </div>
  )
}

export default MyShop

