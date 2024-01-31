import React from "react";
import DropDown from "./DropDown";
import { Link } from "react-router-dom";
import noImage from '/noimage.jpg'

const HorizontalCard = ({ data,title }) => {
  return (
    <div className="w-[100%] flex overflow-y-hidden mb-5 px-5">
      {data.length>0?data.map((trendData, index) => {
        return (
          <Link to={`/${trendData.media_type || title }/details/${trendData.id}`}
            key={index}
            className="min-w-[20%] max-w-[20%] h-[50vh] bg-zinc-900  rounded-xl mr-5 pb-2 mb-2"
          >
            <img
              className="w-full h-[80%] object-top[10%] rounded-t-xl"
              src={ trendData.backdrop_path || trendData.profile_path || trendData.poster_path ?  `https://image.tmdb.org/t/p/original/${
               trendData.profile_path || trendData.poster_path ||  trendData.backdrop_path 
              })`:noImage}
              alt=""
            />

            <div className="mt-1 px-2 h-[20%] overflow-y-auto text-white">
              <h1 className="text-xl">
                {trendData.title||trendData.name ||
                  trendData.original_name ||
                  trendData.original_title
                  }
              </h1>
              <p className="text-zinc-400 ">
                {trendData.overview.slice(0, 60)}...
                <span className="text-zinc-400">more</span>
              </p>
            </div>
          </Link>
        );
      }):<h1 className="text-2xl text-center font-semibold">Nothing to Show</h1>}
    </div>
  );
};

export default HorizontalCard;
