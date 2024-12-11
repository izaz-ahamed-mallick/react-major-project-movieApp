import React from "react";
import { Link } from "react-router-dom";
import noImage from "/noimage.jpg";

const HorizontalCard = ({ data, title }) => {
    return (
        <div className="lg:w-full flex overflow-x-auto lg:mb-5 lg:px-5 space-x-4 snap-x snap-mandatory">
            {data.length > 0 ? (
                data.map((trendData, index) => (
                    <Link
                        to={`/${trendData.media_type || title}/details/${
                            trendData.id
                        }`}
                        key={index}
                        className="min-w-[50vw] sm:min-w-[40%] lg:min-w-[20%] lg:max-w-[20%] h-[40vh] lg:h-[50vh] bg-zinc-900 rounded-xl mr-2 pb-2 mb-2 flex-shrink-0 snap-start"
                    >
                        {/* Image */}
                        <img
                            className="w-full h-[80%] object-cover rounded-t-xl"
                            src={
                                trendData.profile_path ||
                                trendData.poster_path ||
                                trendData.backdrop_path
                                    ? `https://image.tmdb.org/t/p/original/${
                                          trendData.profile_path ||
                                          trendData.poster_path ||
                                          trendData.backdrop_path
                                      }`
                                    : noImage
                            }
                            alt={
                                trendData.title ||
                                trendData.name ||
                                trendData.original_name ||
                                trendData.original_title ||
                                "No image available"
                            }
                        />

                        {/* Content */}
                        <div className="mt-1 px-2 h-[20%] overflow-y-auto text-white">
                            <h1 className="text-lg font-bold truncate">
                                {trendData.title ||
                                    trendData.name ||
                                    trendData.original_name ||
                                    trendData.original_title}
                            </h1>
                            <p className="text-sm text-zinc-400 mt-1">
                                {trendData.overview
                                    ? `${trendData.overview.slice(0, 60)}...`
                                    : "No description available."}
                                <span className="text-zinc-400 ml-1">more</span>
                            </p>
                        </div>
                    </Link>
                ))
            ) : (
                <h1 className="text-2xl text-center font-semibold text-white">
                    Nothing to Show
                </h1>
            )}
        </div>
    );
};

export default HorizontalCard;
