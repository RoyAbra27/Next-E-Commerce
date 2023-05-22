import { useState } from "react";
import axios from "axios";

const useCloudinary = () => {
  const [file, setFile] = useState<any>(null);
  const [filename, setFilename] = useState("");
  const [loading, setLoading] = useState(false);
  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
    setFilename(event.target.files[0].name);
  };
  const getUrlSrc = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "cloudinaryTest");
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dzy1mdmqu/image/upload",
        formData
      );
      return response.data.public_id;
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };
  const uploadImage = {
    handleFileChange,
    getUrlSrc,
    loading,
    filename,
  };
  return { uploadImage };
};

export default useCloudinary;
