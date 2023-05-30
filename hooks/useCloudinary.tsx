import { useState } from "react";
import axios from "axios";

const useCloudinary = () => {
  const [file, setFile] = useState<any>(null);
  const [filename, setFilename] = useState("");
  const [loading, setLoading] = useState(false);

  const fixImage = (url: string) => {
    const urlSplit = url.split(" ");
    const userId = urlSplit[urlSplit.length - 1];
    const urlFixed = url.replace(" " + userId, "");
    return urlFixed;
  }
  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
    setFilename(event.target.files[0].name);
  };
  const getUrlSrc = async (_file: any = undefined) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", _file || file);
    formData.append("upload_preset", "cloudinaryTest");
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dzy1mdmqu/image/upload",
        formData
      );
      setLoading(false);

      return response.data.url;
    } catch (error) {
      console.error(error);
      throw error;
    }

  };

  const uploadImage = {
    handleFileChange,
    getUrlSrc,
    loading,
    filename,
  };
  return { uploadImage,fixImage };
};

export default useCloudinary;
