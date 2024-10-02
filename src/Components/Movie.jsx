import React, { useEffect, useState } from "react";
import TopNav from "../templates/TopNav";
import DropDown from "../templates/DropDown";
import { Link, useNavigate } from "react-router-dom";
import axios from "../Utils/AxiosGet";
import Card from "../templates/Card";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Movie = () => {
    document.title = "SPMovies || Movies";
    const navigate = useNavigate();
    const [movieData, setMovieData] = useState("now_playing");

    const [movie, setCardMovieData] = useState([]);
    const [page, setPage] = useState(1);

    const getMoviePageData = async () => {
        try {
            const { data } = await axios.get(
                `/movie/${movieData}?page=${page}`
            );

            setCardMovieData((prev) => [...prev, ...data.results]);
            setPage(page + 1);
        } catch (error) {
            console.log(error.message);
        }
    };

    const refreshHandler = () => {
        if (movie.length === 0) {
            getMoviePageData();
        } else {
            setCardMovieData([]);
            setPage(page + 1);
            getMoviePageData();
        }
    };

    useEffect(() => {
        refreshHandler();
    }, [movieData]);
    return movie.length > 0 ? (
        <>
            <div className="w-full h-full">
                <div className=" fixed top-0 bg-[#1F1E24] z-[100] w-full flex items-center justify-between px-[3%] ">
                    <h1 className="text-2xl font-semibold text-zinc-600 w-[15%] ">
                        <i
                            onClick={() => navigate(-1)}
                            className=" hover:text-[#6556CD] ri-arrow-left-line cursor-pointer"
                        ></i>
                        Movie
                        <span className="text-lg ml-1 text-zinc-700">
                            ({movieData})
                        </span>
                    </h1>
                    <div className=" w-[75%] text-white flex items-center justify-end ">
                        <div className="flex-1">
                            <TopNav />
                        </div>
                        <DropDown
                            title={"Category"}
                            options={[
                                "popular",
                                "top_rated",
                                "upcoming",
                                "now_playing",
                            ]}
                            func={(e) => {
                                setMovieData(e.target.value);
                            }}
                        />
                    </div>
                </div>

                <InfiniteScroll
                    dataLength={movie.length}
                    next={getMoviePageData}
                    hasMore={page}
                    loader={<h4>Loading...</h4>}
                >
                    <Card data={movie} title="movie" />
                </InfiniteScroll>
            </div>
        </>
    ) : (
        <Loading />
    );
};

export default Movie;
