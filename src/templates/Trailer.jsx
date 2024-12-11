import React from "react";
import ReactPlayer from "react-player/youtube";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import NotFound from "../Components/NotFound";

const Trailer = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const category = pathname.includes("movie") ? "movie" : "tv";

    // Get YouTube trailer video key
    const ytTrailerVideo = useSelector(
        (state) => state[category]?.info?.videos || null
    );

    return (
        <div className="w-full h-screen z-[100] absolute top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.8)] flex items-center justify-center text-white">
            {ytTrailerVideo && ytTrailerVideo.key ? (
                <ReactPlayer
                    controls
                    className="react-player"
                    width="100%" // Full width, responsive
                    height="100%" // Full height, responsive
                    style={{ maxWidth: "1000px", maxHeight: "500px" }} // Limit max size for larger screens
                    url={`https://www.youtube.com/watch?v=${ytTrailerVideo.key}`}
                />
            ) : (
                <NotFound />
            )}
            <button
                onClick={() => navigate(-1)}
                aria-label="Close Trailer"
                className="absolute z-[100] right-[5%] top-[5%] text-white hover:text-[#6556CD] text-4xl cursor-pointer"
            >
                <i className="ri-close-fill"></i>
            </button>
        </div>
    );
};

export default Trailer;
