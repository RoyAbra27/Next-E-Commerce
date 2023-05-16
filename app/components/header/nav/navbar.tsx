"use client"

// Import required components and libraries
import { Disclosure } from '@headlessui/react'
import ProfileDropdown from './components/ProfileDropdown' 
import Navigation from './components/navigation'
import MobileNavigation from './components/mobileNavigation'
import MobileButtonMenu from './components/MobileButtonMenu'
import React, { useState } from 'react'
import { useAuth, useClerk } from '@clerk/nextjs'
// Define the navigation items for the main menu
const navigation = [
  { name: 'Home', href: '/', current: false },
  { name: 'Shops', href: '#', current: false },
  { name: 'FAQ', href: '#', current: false },
  { name: 'Contact', href: '#', current: false },
]
const userNavigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'MyShop', href: '/shops/my-shop', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
]

// Define the navigation items for the profile menu
const profileNavigation = [
  { name: 'Sign In', href: '/sign-in' },
  { name: 'Sign Up', href: '/sign-up' }
]
const profileNavigationSignedIn = [
  { name: 'users', href: '/admin/users' },
  { name: 'Account', href: '/account' },
  { name: 'Sign Out', href: '/sign-out' }
]

// Utility function to combine class names
function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ') as any
}

// Header component
const Navbar = () => {
const {isSignedIn} = useAuth()

  // Return the header component with desktop and mobile navigation
  return (
    <Disclosure as="nav" className="bg-[#ffffff] shadow-md">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8  py-2  ">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <MobileButtonMenu open={open} />
              </div>
              {/* Desktop navigation */}
              <Navigation  classNames={classNames} navigation={isSignedIn?userNavigation: navigation} />
              {/* Profile dropdown navigation */}
              <ProfileDropdown
                classNames={classNames}
                profileNavigation={isSignedIn?profileNavigationSignedIn: profileNavigation}
              /> 
            </div>

       
          </div>
          {/* Mobile navigation */}
          <MobileNavigation  classNames={classNames} navigation={isSignedIn?userNavigation: navigation} />
          {/* Authentication modal */}
        </>
      )}
    </Disclosure>
  )
}

// Export the Header component
export default Navbar as React.FC