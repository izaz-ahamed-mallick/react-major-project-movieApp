import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.5),rgba(0,0,0,0.9)),url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path
        })`,
        backgroundPosition: "top[10%]",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="h-[50vh]  lg:w-full lg:h-[65vh] flex flex-col justify-end mt-1"
    >
      <div className=" w-full p-[3%] lg:p-[5%] lg:w-[70%]">
        <h1 className="text-4xl font-semibold mb-2 ">
          <i className="mr-1 ri-play-circle-line"></i>
          {data.name || data.original_name || data.original_title || data.title}
        </h1>
        <p className="text-zinc-400">
          {data.overview.slice(0, 100)}...
          <Link
            to={`/${data.media_type}/details/${data.id}`}
            className="text-blue-400"
          >
            more
          </Link>
        </p>
        <div className="flex gap-3 lg:flex lg:items-center lg:gap-4 text-zinc-400 mt-2">
          <h2>
            <i className="text-yellow-400 mr-1 ri-megaphone-fill"></i>
            {data.first_air_date || data.release_date}
          </h2>
          <p>
            <i className="text-yellow-400 mr-1 ri-album-fill"></i>
            {data.media_type.toUpperCase()}
          </p>
          <p>
            {data.vote_average.toFixed(1)}
            <i className=" text-yellow-400 ml-1 ri-star-fill"></i>
          </p>
        </div>

        <Link
          to={`/${data.media_type}/details/${data.id}/trailer`}
          className="p-3 rounded-lg hover:bg-[#5b49d1] bg-[#6556CD] mt-2 block w-fit"
        >
          <i className="fa-solid fa-play"></i> Watch Trailer
        </Link>
      </div>
    </div>
  );
};

export default Header;
