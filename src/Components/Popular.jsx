import React, { useEffect, useState } from "react";
import TopNav from "../templates/TopNav";
import DropDown from "../templates/DropDown";
import { Link, useNavigate } from "react-router-dom";
import axios from "../Utils/AxiosGet";
import Card from "../templates/Card";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Popular = () => {
  document.title = 'SPMovies || Popular'
  const navigate = useNavigate();
  const [popularData, setPopularData] = useState("movie");

  const [popularCardData, setPopularCardData] = useState([]);
  const [page, setPage] = useState(1);

  const getPopularPageData = async () => {
    try {
      const { data } = await axios.get(`/${popularData}/popular?page=${page}`);

      setPopularCardData((prev) => [...prev, ...data.results]);
      setPage(page + 1);
     
    } catch (error) {
      console.log(error);
    }
  };

  const refreshHandler = () => {
    if (popularCardData.length === 0) {
      getPopularPageData();
    } else {
      setPopularCardData([]);
      setPage(page + 1);
      getPopularPageData();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [popularData]);
  return popularCardData.length > 0 ? (
    <>
      <div className="w-full h-full">
        <div className="fixed top-0 bg-[#1F1E24] z-[100]  w-full flex items-center justify-between px-[3%] ">
          <h1 className="text-2xl font-semibold text-zinc-600 w-[10%] ">
            <i
              onClick={() => navigate(-1)}
              className=" hover:text-[#6556CD] ri-arrow-left-line cursor-pointer"
            ></i>
            Popular<span className="text-lg ml-1 text-zinc-700">({popularData})</span>
          </h1>
          <div className=" w-[75%] text-white flex items-center justify-end ">
            <div className="flex-1">
            
              <TopNav />

            </div>
            <DropDown
            title={"Category"}
            options={["tv", "movie"]}
            func={(e) => {
              setPopularData(e.target.value);
            }}
          />
         
        </div>
        </div>

        <InfiniteScroll
          dataLength={popularCardData.length}
          next={getPopularPageData}
          hasMore={page}
          loader={<h4>Loading...</h4>}
        >
          <Card data={popularCardData} title={popularData} />
        </InfiniteScroll>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Popular;
