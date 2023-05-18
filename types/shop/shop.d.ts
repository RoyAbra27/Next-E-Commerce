import { Product } from "@prisma/client";

export interface shopType {
    name: string,
    description: string,
    logo: string | null | undefined,
    coverImage: string | null | undefined,
    owner_id: string,
    products: Product[],
}


export interface createShopFields {
    name: string;
    description: string;
    logo: string;
    coverImage: string;
}
   