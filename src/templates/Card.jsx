import React from "react";
import { Link } from "react-router-dom";
import noImage from "/noimage.jpg";

const Card = ({ data, title }) => {
    return (
        <>
            <div className="w-full h-full flex justify-center flex-wrap gap-6 px-4 bg-[#1F1E24] mt-[170px] sm:mt-[100px]">
                {data.map((c, i) => (
                    <Link
                        to={`/${c.media_type || title}/details/${c.id}`}
                        className="w-full sm:w-[40%] md:w-[30%] lg:w-[20%] relative group"
                        key={i}
                    >
                        <div className="relative w-full h-auto">
                            <img
                                className="w-full max-h-[40vh] object-cover rounded-lg shadow-lg"
                                src={
                                    c.poster_path ||
                                    c.backdrop_path ||
                                    c.profile_path
                                        ? `https://image.tmdb.org/t/p/original/${
                                              c.poster_path ||
                                              c.backdrop_path ||
                                              c.profile_path
                                          }`
                                        : noImage
                                }
                                alt="Poster"
                            />
                            {c.vote_average && (
                                <div className="absolute top-2 right-2 text-xs md:text-sm lg:text-base text-white bg-yellow-600 w-10 h-10 flex items-center justify-center rounded-full shadow-md">
                                    {(c.vote_average * 10).toFixed()}
                                    <sup>%</sup>
                                </div>
                            )}
                        </div>
                        <h1 className="text-sm md:text-base lg:text-lg text-zinc-300 mt-2 text-center">
                            {c.name ||
                                c.original_name ||
                                c.original_title ||
                                c.title}
                        </h1>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default Card;
