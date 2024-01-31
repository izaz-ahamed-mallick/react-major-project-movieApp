import React from "react";
import { Link } from "react-router-dom";
import noImage from '/noimage.jpg'

const Card = ({ data,title }) => {

 
  return (
    <>
      <div className="w-full h-full flex justify-center flex-wrap gap-x-12 gap-y-5 px-[3%] bg-[#1F1E24] mt-16 ">
        {data.map((c, i) => {
          return (
            <Link to={`/${c.media_type || title}/details/${c.id} `} className="w-[27vh] relative" key={i}>
              <img
                className="h-[40vh] object-cover object-top-right rounded-lg shadow-[15px_25px_45px_10px_rgba(0,0,0,0.3)]"
                src={c.poster_path || c.backdrop_path || c.profile_path ? 
                  
                  `https://image.tmdb.org/t/p/original/${
                  c.poster_path || c.backdrop_path || c.profile_path}`:noImage
                }
                alt=""
              />
              <h1 className="text-xl text-zinc-300">
                {c.name || c.original_name || c.original_title || c.title}
              </h1>
              {c.vote_average && (
                <div className=" absolute bottom-[33%] right-[-10%] text-xl text-white w-[6vh] h-[6vh] bg-yellow-600 flex items-center justify-center rounded-full">
                  {(c.vote_average * 10).toFixed()}
                  <sup>%</sup>
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Card;
