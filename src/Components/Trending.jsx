import React, { useEffect, useState } from "react";
import TopNav from "../templates/TopNav";
import DropDown from "../templates/DropDown";
import { Link, useNavigate } from "react-router-dom";
import axios from "../Utils/AxiosGet";
import Card from "../templates/Card";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";
const Trending = () => {
    document.title = "SPMovies || Trending";
    const navigate = useNavigate();

    const [trendingCategory, setTrendingCategory] = useState("all");
    const [trendingDuration, setTrendingDuration] = useState("day");

    const [trendingCardData, setTrendingCardData] = useState([]);
    const [page, setPage] = useState(1);

    const getTrendingPageData = async () => {
        try {
            const { data } = await axios.get(
                `/trending/${trendingCategory}/${trendingDuration}?page=${page}`
            );

            setTrendingCardData((prev) => [...prev, ...data.results]);
            setPage(page + 1);
        } catch (error) {
            console.log(error);
        }
    };

    const refreshHandler = () => {
        if (trendingCardData.length === 0) {
            getTrendingPageData();
        } else {
            setTrendingCardData([]);
            setPage(page + 1);
            getTrendingPageData();
        }
    };

    useEffect(() => {
        refreshHandler();
    }, [trendingCategory, trendingDuration]);
    return trendingCardData.length > 0 ? (
        <>
            <div className="w-full h-full">
                <div className="fixed top-0 bg-[#1F1E24] z-[100] w-full flex flex-wrap items-center justify-between px-4 py-2">
                    <h1 className="text-lg md:text-xl lg:text-2xl font-semibold text-zinc-600 w-full md:w-[30%]">
                        <i
                            onClick={() => navigate(-1)}
                            className="hover:text-[#6556CD] ri-arrow-left-line cursor-pointer"
                        ></i>
                        Trending
                        <span className="text-sm md:text-base ml-1 text-zinc-400">
                            ({trendingCategory})
                        </span>
                    </h1>
                    <div className="w-full md:w-[70%] flex flex-wrap md:flex-nowrap justify-between items-center mt-2 md:mt-0">
                        <div className="w-full md:w-[45%] lg:w-[60%]">
                            <TopNav />
                        </div>
                        <div className="w-full md:w-[40%] flex gap-4 mt-2 md:mt-0">
                            <DropDown
                                title="Category"
                                options={["tv", "movie", "all"]}
                                func={(e) =>
                                    setTrendingCategory(e.target.value)
                                }
                            />
                            <DropDown
                                title="Duration"
                                options={["week", "day"]}
                                func={(e) =>
                                    setTrendingDuration(e.target.value)
                                }
                            />
                        </div>
                    </div>
                </div>

                <InfiniteScroll
                    dataLength={trendingCardData.length}
                    next={getTrendingPageData}
                    hasMore={page}
                    loader={<h4>Loading...</h4>}
                >
                    <Card data={trendingCardData} title={trendingCategory} />
                </InfiniteScroll>
            </div>
        </>
    ) : (
        <Loading />
    );
};

export default Trending;
