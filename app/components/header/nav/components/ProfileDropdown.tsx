"use client"

// Import required components and libraries
import React, { useState } from 'react'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useRouter } from 'next/navigation'
import { profileDropdownProps } from '@/types/navbar/navbar'
import { SignedIn, SignedOut, UserButton,useUser ,useClerk} from '@clerk/nextjs'

// ProfileDropdown component
const ProfileDropdown = ({ profileNavigation, classNames }:profileDropdownProps) => {
  const {user} = useUser()
  const {openUserProfile,signOut,openSignUp,openSignIn} = useClerk();

  // Use the useNavigate hook to navigate between pages
const router = useRouter()
  return (
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
 

      {/* Profile dropdown */}
      <Menu as="div" className="relative ml-3">
        <div>

          <Menu.Button className="flex rounded-full border text-sm focus:outline-none focus:ring-2 focus:none focus:ring-offset-2 focus:none">
            <span className="sr-only">Open user menu</span>
            {/* User avatar */}
            <SignedOut>
            <div className="avatar placeholder">
              <div className="  text-neutral-content bg-purple-500 rounded-[50%] w-[33px] h-[33px] flex items-center justify-center">
                <img
                alt='user avatar'
                src={"https://cdn-icons-png.flaticon.com/512/3177/3177440.png"} width={'100%'} height={'100%'}  />
              </div>
            </div>
            </SignedOut>
            <SignedIn>
            {/* <UserButton /> */}
            <div className="avatar placeholder">
              <div className="  text-neutral-content bg-purple-500 rounded-[50%] w-[33px] h-[33px] flex items-center justify-center">
                <img
                className='rounded-[50%]'
                alt='user avatar'
                src={user?.profileImageUrl} width={'100%'} height={'100%'}  />
              </div>
            </div>
            </SignedIn>

          </Menu.Button>
        </div>
        {/* Dropdown menu transition */}
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          {/* Dropdown menu items */}
         
          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
         
            {profileNavigation.map((item:any, i:number) => (
              <Menu.Item key={i}>
                {({ active }) => (
                  <button
                  onClick={() => {
                    //? Check if the item is not 'Login' or 'Register'
                    if(item.href === '/account'){
                      openUserProfile()
                    }else if(item.href === '/sign-out'){
                      signOut()
                    }else if('/sign-in'){
                      openSignIn()
                    }else if('/sign-up'){
                      openSignUp()
                    }else{
                      router.push(item.href)
                    }
                  }}
                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 w-[100%]')}
                  >
                    {item.name}
                  </button>
                )}
              </Menu.Item>
            ))}

          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

// Export the ProfileDropdown component
export default ProfileDropdown as React.FC<profileDropdownProps>

