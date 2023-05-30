import React from "react";

const CoverImage = ({ coverImage }: { coverImage: string }) => {
  return (
    <div
      className="bg-cover bg-center w-full h-[30vh] sm:h-[35vh] md:h-[40vh]  lg:h-[45vh] 2xl:h-[55vh] "
      style={{ backgroundImage: `url(${coverImage})` }}
    ></div>
  );
};

export default CoverImage as React.FC<{
  coverImage: string;
}>;
