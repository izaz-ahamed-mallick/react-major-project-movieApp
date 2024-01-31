import React, { useEffect, useState } from "react";
import TopNav from "../templates/TopNav";
import DropDown from "../templates/DropDown";
import { Link, useNavigate } from "react-router-dom";
import axios from "../Utils/AxiosGet";
import Card from "../templates/Card";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const TvShows = () => {
  document.title = "SPMovies || Tv Shows";
  const navigate = useNavigate();
  const [TvShowsData, setTvShowsData] = useState("popular");

  const [TvShowsCard, setTvShowsCard] = useState([]);
  const [page, setPage] = useState(1);

  const getTvPageData = async () => {
    try {
      const { data } = await axios.get(`/tv/${TvShowsData}?page=${page}`);

      setTvShowsCard((prev) => [...prev, ...data.results]);
      setPage(page + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const refreshHandler = () => {
    if (TvShowsCard.length === 0) {
      getTvPageData();
    } else {
      setTvShowsCard([]);
      setPage(page + 1);
      getTvPageData();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [TvShowsData]);
  return TvShowsCard.length > 0 ? (
    <>
      <div className="w-full h-full">
        <div className="fixed top-0 bg-[#1F1E24] z-[100]  w-full flex items-center justify-between px-[3%] ">
          <h1 className="text-2xl font-semibold text-zinc-600 w-[15%] ">
            <i
              onClick={() => navigate(-1)}
              className=" hover:text-[#6556CD] ri-arrow-left-line cursor-pointer"
            ></i>
            TvShow
            <span className="text-lg ml-1 text-zinc-700">({TvShowsData})</span>
          </h1>
          <div className=" w-[75%] text-white flex items-center justify-end ">
            <div className="flex-1">
              <TopNav />
            </div>
            <DropDown
              title={"Category"}
              options={["airing_today", "on_the_air", "top_rated", "popular"]}
              func={(e) => {
                setTvShowsData(e.target.value);
              }}
            />
          </div>
        </div>

        <InfiniteScroll
          dataLength={TvShowsCard.length}
          next={getTvPageData}
          hasMore={page}
          loader={<h4>Loading...</h4>}
        >
          <Card data={TvShowsCard} title="tv" />
        </InfiniteScroll>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default TvShows;
