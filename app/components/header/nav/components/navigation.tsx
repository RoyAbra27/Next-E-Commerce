"use client"

import { navigationProps } from '@/types/navbar/navbar'
import Image from 'next/image'
import React from 'react'

const Navigation = ({navigation,classNames,icon}:navigationProps) => {
  return (
    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
    <div className="flex flex-shrink-0 items-center">
      <Image
        className="block h-8 w-auto lg:hidden"
        src={icon}
        alt="Your Company"
      />
      <Image
        className="hidden h-8 w-auto lg:block"
        src={icon}
        alt="Your Company"
      />
    </div>
    <div className="hidden sm:ml-6 sm:block">
      <div className="flex space-x-4">
        {/* Desktop */}
        {navigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={classNames(
              item.current ? 'bg-white text-red-600' : 'text-gray-300 hover:bg-white hover:text-red-600',
              'rounded-md px-3 py-2 text-sm font-medium'
            )}
            aria-current={item.current ? 'page' : undefined}
          >
            {item.name}
          </a>
        ))}
      </div>
    </div>
  </div>
  )
}

export default Navigation