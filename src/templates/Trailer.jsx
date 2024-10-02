import React from "react";
import ReactPlayer from "react-player/youtube";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NotFound from "../Components/NotFound";

const Trailer = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const category = pathname.includes("movie") ? "movie" : "tv";
    const ytTrailerVideo = useSelector((state) => state[category].info.videos);
    return (
        <>
            <div className="w-full h-screen z-[100] absolute top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.8)] flex items-center justify-center text-white ">
                {ytTrailerVideo && ytTrailerVideo.key ? (
                    <ReactPlayer
                        controls
                        height={500}
                        width={1080}
                        url={`https://www.youtube.com/watch?v=${ytTrailerVideo.key}`}
                    />
                ) : (
                    <NotFound />
                )}
                <Link className="absolute z-[100] right-[5%] top-5">
                    <i
                        onClick={() => navigate(-1)}
                        className=" text-white hover:text-[#6556CD] text-4xl ri-close-fill cursor-pointer"
                    ></i>
                </Link>
            </div>
        </>
    );
};

export default Trailer;
