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

  export {navigation,profileNavigation,profileNavigationSignedIn,userNavigation}
  