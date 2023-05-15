import { StaticImageData } from "next/image"

export interface navigationProps{
    navigation: {name: string, href: string, current:boolean }[]
    classNames:(...any)=>any
}
export interface profileDropdownProps{
    profileNavigation: {name: string, href: string}[]
    classNames:(...any)=>any
}
export interface mobileNavigationProps{
    navigation: {name: string, href: string, current:boolean }[]
    classNames:(...any)=>any
}


