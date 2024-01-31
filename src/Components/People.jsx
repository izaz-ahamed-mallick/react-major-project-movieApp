import React, { useEffect, useState } from "react";
import TopNav from "../templates/TopNav";
import DropDown from "../templates/DropDown";
import { Link, useNavigate } from "react-router-dom";
import axios from "../Utils/AxiosGet";
import Card from "../templates/Card";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const People = () => {
  document.title = "SPMovies || Tv Shows";
  const navigate = useNavigate();
  const [Person, setPerson] = useState("popular");

  const [PersonCardData, setPersonCardData] = useState([]);
  const [page, setPage] = useState(1);

  const getPersonPageData = async () => {
    try {
      const { data } = await axios.get(`/person/${Person}?page=${page}`);
 
      setPersonCardData((prev) => [...prev, ...data.results]);
      setPage(page + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const refreshHandler = () => {
    if (PersonCardData.length === 0) {
      getPersonPageData();
    } else {
      setPersonCardData([]);
      setPage(page + 1);
      getPersonPageData();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [Person]);
  return PersonCardData.length > 0 ? (
    <>
      <div className="w-full h-full">
        <div className="fixed top-0 bg-[#1F1E24] z-[100]  w-full flex items-center justify-between px-[3%] ">
          <h1 className="text-2xl font-semibold text-zinc-600 w-[15%] ">
            <i
              onClick={() => navigate(-1)}
              className=" hover:text-[#6556CD] ri-arrow-left-line cursor-pointer"
            ></i>
            People
            
          </h1>
          <div className=" w-[75%] text-white flex items-center justify-end ">
            <div className="flex-1">
              <TopNav />
            </div>
          
          </div>
        </div>

        <InfiniteScroll
          dataLength={PersonCardData.length}
          next={getPersonPageData}
          hasMore={page}
          loader={<h4>Loading...</h4>}
        >
          <Card data={PersonCardData} title='person'  />
        </InfiniteScroll>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default People;
