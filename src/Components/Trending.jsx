import React, { useEffect, useState } from "react";
import TopNav from "../templates/TopNav";
import DropDown from "../templates/DropDown";
import { Link, useNavigate } from "react-router-dom";
import axios from "../Utils/AxiosGet";
import Card from "../templates/Card";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";
const Trending = () => {
  document.title = 'SPMovies || Trending'
  const navigate = useNavigate();
  const [trendingData, settrendingData] = useState("all");
  const [trendingDuration, setTrendingDuration] = useState("day");

  const [trendingCardData, setTrendingCardData] = useState([]);
  const [page, setPage] = useState(1);

  const getTrendingPageData = async () => {
    try {
      const { data } = await axios.get(
        `/trending/${trendingData}/${trendingDuration}?page=${page}`
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
  }, [trendingData, trendingDuration]);
  return trendingCardData.length > 0 ? (
    <>
      <div className="w-full h-full">
        <div className="fixed top-0 bg-[#1F1E24] z-[100]  w-full flex items-center justify-between px-[3%] ">
          <h1 className="text-2xl font-semibold text-zinc-600 w-[15%] ">
            <i
              onClick={() => navigate(-1)}
              className=" hover:text-[#6556CD] ri-arrow-left-line cursor-pointer"
            ></i>
            Trending<span className="text-lg ml-1 text-zinc-700">({trendingData})</span>
          </h1>
          <div className=" w-[85%]  text-white flex items-center">
            <div className="w-[90%]">
            
              <TopNav />
            </div>
          <DropDown
            title={"Category"}
            options={["tv", "movie", "all"]}
            func={(e) => {
              settrendingData(e.target.value);
            }}
          />
          <div className="w-[2%]"></div>
          <DropDown
            title={"Duration"}
            options={["week", "day"]}
            func={(e) => {
              setTrendingDuration(e.target.value);
            }}
          />
        </div>
        </div>

        <InfiniteScroll
          dataLength={trendingCardData.length}
          next={getTrendingPageData}
          hasMore={page}
          loader={<h4>Loading...</h4>}
        >
          <Card data={trendingCardData} title={trendingData} />
        </InfiniteScroll>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Trending;
