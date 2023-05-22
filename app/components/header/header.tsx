"use client";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Navbar from "./nav/navbar";

const Header = () => {
  return (
    <>
      <div  className="lg:fixed top-0 right-0 left-0 lg:z-[40]">
        <Navbar />
      </div>

      <div className="hidden lg:block h-[10vh]">

      </div>
    </>
  );
};

export default Header;
