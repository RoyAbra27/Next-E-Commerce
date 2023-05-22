"use client";
import useCloudinary from "@/hooks/useCloudinary";
const UploadForm = () => {
  const {
    uploadImage: { filename, handleFileChange, getUrlSrc, loading },
  } = useCloudinary();
  const handleSubmit = async () => {
    const url = await getUrlSrc();
    console.log(url);
  };

  return (
    <div>
      <div>
        <input type="file" onChange={handleFileChange} />
        {/* <label>{filename}</label> */}
      </div>
      <button
        onClick={handleSubmit}
        className="btn bg-black p-2 m-3 rounded-md text-white"
      >
        Upload
      </button>
    </div>
  );
};
export default UploadForm;
