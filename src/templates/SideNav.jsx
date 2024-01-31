import React from "react";
import { Link } from "react-router-dom";

const SideNav = () => {
  return (
    <div className="w-[20%] h-full border-r-2 p-10">
      <h1 className="text-2xl font-bold">
        <i className="mr-2 text-3xl text-[#6556CD]  ri-tv-fill"></i>
        <span className="text-[#6556CD] drop-shadow-lg">𝐒𝐏𝐌𝐨𝐯𝐢𝐞𝐬.</span>
      </h1>
      <nav className="mt-4 flex flex-col gap-3">
        <h1 className="text-lg font-semibold ">News Feed</h1>

        <Link
          to="/trending"
          className=" hover:bg-[#6556CD] rounded-lg duration-200 p-3 "
        >
          <i className="mr-2 ri-fire-fill "></i>
          Trending
        </Link>
        <Link
          to={"/popular"}
          className=" hover:bg-[#6556CD] rounded-lg duration-200 p-3 "
        >
          <i className="mr-2 ri-bard-fill "></i>
          Popular
        </Link>
        <Link
          to={"/movie"}
          className=" hover:bg-[#6556CD] rounded-lg duration-200 p-3 "
        >
          <i className="mr-2 ri-movie-2-fill "></i>
          Movies
        </Link>
        <Link
          to={"/tv"}
          className=" hover:bg-[#6556CD] rounded-lg duration-200 p-3 "
        >
          <i className="mr-2 ri-tv-2-fill "></i>
          Tv Shows
        </Link>
        <Link
          to={"/person"}
          className=" hover:bg-[#6556CD] rounded-lg duration-200 p-3 "
        >
          <i className="mr-2 ri-team-fill "></i>
          People
        </Link>
      </nav>
      <hr className="my-2 bg-transparent h-[1px] bg-zinc-200" />

      <nav className="mt-4 flex flex-col gap-3">
        <Link to={'/about'}
         className=" hover:bg-[#6556CD] rounded-lg duration-200 p-3 ">
          <i className="mr-2 ri-information-fill "></i>
          About SPMovies
        </Link>
        <Link to={'/contact-us'}
        className=" hover:bg-[#6556CD] rounded-lg duration-200 p-3 ">
          <i className="mr-2 ri-phone-fill "></i>
          Contact Us
        </Link>
      </nav>
    </div>
  );
};

export default SideNav;
