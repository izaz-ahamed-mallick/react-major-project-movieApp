import React, { useState } from "react";
import { Link } from "react-router-dom";

const SideNav = () => {
  const [menubtn, setMenubtn] = useState(true);

  return (
    <div className=" px-4 py-2  lg:w-[20%] lg:h-full lg:border-r-2 lg:p-10">
      <h1 className="sm:h-[10vh] flex justify-between items-center sm:w-full text-2xl font-bold">
        <div>
          <i className="mr-2 text-3xl text-[#6556CD]  ri-tv-fill"></i>
          <span className="text-[#6556CD] drop-shadow-lg">𝐒𝐏𝐌𝐨𝐯𝐢𝐞𝐬.</span>
        </div>
        <div>
          <i
            onClick={() => setMenubtn((prev) => !prev)}
            className=" cursor-pointer hover:text-[#6556CD] fa-solid fa-bars lg:hidden"
          ></i>
        </div>
      </h1>

      <nav
        className={` flex bg-[#1F1E24] flex-col w-fit absolute right-[7%] ${
          menubtn ? "opacity-0" : "opacity-100"
        } duration-300 top-[8%] p-1 z-[300] lg:mt-4 lg:flex lg:flex-col lg:gap-3 lg:relative lg:top-0 lg:left-0 lg:opacity-100`}
      >
        <h1 className="hidden lg:text-lg lg:font-semibold lg:block ">
          News Feed
        </h1>

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

      <nav className="hidden lg:mt-4 lg:flex lg:flex-col lg:gap-3">
        <Link
          to={"/about"}
          className=" hover:bg-[#6556CD] rounded-lg duration-200 p-3 "
        >
          <i className="mr-2 ri-information-fill "></i>
          About SPMovies
        </Link>
        <Link
          to={"/contact-us"}
          className=" hover:bg-[#6556CD] rounded-lg duration-200 p-3 "
        >
          <i className="mr-2 ri-phone-fill "></i>
          Contact Us
        </Link>
      </nav>
    </div>
  );
};

export default SideNav;
