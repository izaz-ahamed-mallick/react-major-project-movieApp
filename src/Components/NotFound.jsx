import React from "react";
import notFound from "/404.gif";
const NotFound = () => {
  return (
    <div className=" absolute top-0 left-0 w-screen h-screen flex items-center justify-center bg-black">
      <img className=" object-cover w-[50%]" src={notFound} alt="" />
    </div>
  );
};

export default NotFound;
