"use client"

import React from 'react'
import { Disclosure } from '@headlessui/react'
import { mobileNavigationProps } from '@/types/navbar/navbar'
import { useRouter } from 'next/navigation'
const MobileNavigation = ({classNames,navigation}:mobileNavigationProps) => {
  const router = useRouter()
  return (
    <Disclosure.Panel className="sm:hidden">
    <div className="space-y-1 px-2 pb-3 pt-2">

      {navigation.map((item) => (
        <Disclosure.Button
          key={item.name}
          as="button"
          onClick={()=>{
            router.push(item.href)
          }}
          className={classNames(
            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
            'block rounded-md px-3 py-2 text-base font-medium w-[100%]'
          )}
          aria-current={item.current ? 'page' : undefined}
        >
          {item.name}
        </Disclosure.Button>
      ))}
    </div>
  </Disclosure.Panel>
  )
}

export default MobileNavigation