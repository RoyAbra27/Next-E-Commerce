"use client"
import { SignInButton, SignUpButton, SignedIn,SignedOut, UserButton } from "@clerk/nextjs"
import Navbar from "./nav/navbar"



const Header = () => {
  
  return (
    <div>
     <Navbar/>
    </div>
  )
}

export default Header