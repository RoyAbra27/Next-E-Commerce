"use client"

// Import required components and libraries
import React from 'react'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { BellIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import { profileDropdownProps } from '@/types/navbar/navbar'
import { SignedIn, SignedOut, UserButton  } from '@clerk/nextjs'
import { SignIn } from '@clerk/clerk-react'

// ProfileDropdown component
const ProfileDropdown = ({ profileNavigation, classNames }:profileDropdownProps) => {
/*
 ?profileNavigation: An array of objects representing the items in the profile dropdown menu.
 !Each object has a 'name' and 'href' property, where 'name' is the display text and 'href' is the navigation target.
*/

/*
? handleAuthOpenModal: A function passed down from the parent component (Header) to handle opening the
 !authentication modal when the 'Login' or 'Register' item is clicked in the profile dropdown menu.
! The function takes 'href' as a parameter, which determines whether the modal should display the login or register form.
*/



  // Use the useNavigate hook to navigate between pages
const router = useRouter()
  return (
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
      {/* Notifications button */}
      <button
        type="button"
        className="rounded-full bg-[#2E2E2E] p-1 text-gray-400 hover:text-red-600 focus:outline-none focus:none focus:bg-transparent focus:ring-offset-2 focus:ring-offset-gray-800"
      >
        <span className="sr-only">View notifications</span>
       
      </button>

      {/* Profile dropdown */}
      <Menu as="div" className="relative ml-3">
        <div>

          <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-gray-800">
            <span className="sr-only">Open user menu</span>
            {/* User avatar */}
            <SignedOut>
            <div className="avatar placeholder">
              <div className=" bg-red-600 text-neutral-content rounded-full w-8">
                <span className="text-[0.7em]">Guest</span>
              </div>
            </div>
            </SignedOut>
            <SignedIn>
            <UserButton />
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
                      router.push(item.href)
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

