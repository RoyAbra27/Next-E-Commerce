import { GET_SHOPS_URL } from "@/constant/constant";

const getShops = async () => {
    try{
        const response = await apiGet(GET_SHOPS_URL);
    }catch(error){
        throw error;
    }
}