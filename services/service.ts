
const apiGet =async (url:string) => {
    try{
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }catch(error){
        throw error;
    }
}

const apiPost = async (url:string, bodyData:object) => {
    try{
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(bodyData),
        });
        const data = await response.json();
        return data;
    }catch(error){
        throw error;
    }
}
const apiPostFormData = async (url:string, bodyData:object) => {
    try{
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(bodyData),
        });
        const data = await response.json();
        return data;
    }catch(error){
        throw error;
    }
}