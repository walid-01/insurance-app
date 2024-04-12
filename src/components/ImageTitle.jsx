import React from "react";

const ImageTitle = ({
  imgName = "2023-BMW-3-Series-6.png",
  titleText,
  imgStyle = "",
  titleStyle = "",
}) => {
  return (
    <div
      className={`flex p-10 flex-col justify-center items-center w-full h-64 bg-no-repeat bg-center bg-cover mb-10 ${imgStyle}`}
      style={{ backgroundImage: `url('/images/${imgName}')` }}
    >
      <h2
        className={`text-white bg-gray-800 px-5 py-3 bg-opacity-60 text-4xl font-bold ${titleStyle}`}
      >
        {titleText}
      </h2>
    </div>
  );
};

export default ImageTitle;
