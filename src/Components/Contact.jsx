import React from "react";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-[50%] h-[60%] bg-zinc-200 p-4 rounded shadow-xl">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold text-zinc-500">Contact Us</h1>
          <i
            onClick={() => navigate(-1)}
            className=" text-zinc-400 hover:text-[#6556CD] text-4xl ri-close-fill cursor-pointer"
          ></i>
        </div>
        <hr className="border-none bg-zinc-500 h-[1px] my-2" />
        <form action="" onSubmit={handleSubmit}>
          <label className="block text-zinc-500 text-md my-1 " htmlFor="email">
            Contact Email
          </label>
          <input
            className="w-full p-2 border border-zinc-400 outline-none bg-transparent rounded"
            type="email"
          />
          <label className="block text-zinc-500 text-md my-1" htmlFor="subjct">
            Subject
          </label>
          <input
            className="w-full p-2 border border-zinc-400 outline-none bg-transparent rounded"
            type="text"
          />
          <label className="block text-zinc-500 text-md my-1" htmlFor="content">
            Content
          </label>
          <textarea className="w-full resize-none p-2 border border-zinc-400 outline-none bg-transparent rounded"></textarea>
          <button className="px-4 py-2 bg-[#6556CD] text-lg font-semibold mt-2 rounded text-zinc-100">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
