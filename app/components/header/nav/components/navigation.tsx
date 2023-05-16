"use client";
import Logo from "../../../../../assets/logo.png";

import { navigationProps } from "@/types/navbar/navbar";
import React from "react";
import Select from "react-select";
import { TbShirt, TbDeviceGamepad2 } from "react-icons/tb";
import { IoMdCar } from "react-icons/io";
import { CgSmartphone } from "react-icons/cg";
import { FaBookOpen } from "react-icons/fa";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    label: "Clothing",
    value: "clothing",
    icon: <TbShirt size={"17px"} color={"skyblue"} />,
  },
  {
    label: "Games",
    value: "games",
    icon: <TbDeviceGamepad2 size={"17px"} color={"skyblue"} />,
  },
  {
    label: "Cars",
    value: "cars",
    icon: <IoMdCar size={"17px"} color={"skyblue"} />,
  },
  {
    label: "Phones",
    value: "phones",
    icon: <CgSmartphone size={"17px"} color={"skyblue"} />,
  },
  {
    label: "Books",
    value: "books",
    icon: <FaBookOpen size={"17px"} color={"skyblue"} />,
  },
  {
    label: "Computer",
    value: "computer",
    icon: <HiOutlineDesktopComputer size={"17px"} color={"skyblue"} />,
  },
];

interface selectProps {
  label: string;
  value: string;
  icon?: React.JSX.Element;
}
const Navigation = ({ navigation, classNames }: navigationProps) => {
  const options = categories as selectProps[];
  return (
    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start md:justify-between ">
      <div className="flex flex-shrink-0 items-center justify-between  md:w-[40%] ">
        <div className="">
          <div className="block h-8 w-auto lg:hidden">
            <Image src={Logo} alt="" width={120} />
          </div>
          <div className="hidden  w-auto lg:block ">
            <Image src={Logo} alt="" width={120} />
          </div>
        </div>
        <div className="md:w-[50%]">
          <Select
            placeholder="Categories"
            className="w-full  text-[skyblue] outline-none focus:outline-none hidden md:block"
            options={options}
            getOptionLabel={(e): any => (
              <div className="flex w-[70%] mx-auto items-center justify-between cursor-pointer">
                <span className="mx-4 text-[skyblue]">{e.label}</span>
                {e.icon}
              </div>
            )}
          />
        </div>
      </div>
      <div className="hidden sm:ml-6 sm:block ">
        <div className="flex space-x-4">
          {/* Desktop */}
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={classNames(
                item.current
                  ? "bg-gray-300 text-black"
                  : "text-black hover:bg-white hover:text-gray-300",
                "rounded-md px-3 py-2 text-sm font-medium"
              )}
              aria-current={item.current ? "page" : undefined}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
