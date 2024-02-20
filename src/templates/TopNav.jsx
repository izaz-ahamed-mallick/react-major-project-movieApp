import axios from "../Utils/AxiosGet";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noimg from "/noimage.jpg";
import Header from "./Header";
const TopNav = () => {
  const [inpvalue, setInpValue] = useState("");
  const [searchData, setSearchData] = useState([]);

  const getSearchData = useCallback(async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${inpvalue}`);

      setSearchData(data.results);
    } catch (error) {
      console.log(error);
    }
  }, [inpvalue]);

  useEffect(() => {
    getSearchData();
  }, [inpvalue]);

  const closeBtn = () => {
    setInpValue("");
  };

  return searchData ? (
    <>
      <div className={`w-full bg-[#1F1E24]`}>
        <div
          className={`flex items-center gap-x-2 mt-0 h-[8vh] lg:w-[100%] lg:h-[10vh] lg:flex lg:items-center lg:px-32 lg:gap-x-7 lg:relative`}
        >
          <i className=" text-2xl text-zinc-600 ri-search-line"></i>
          <input
            value={inpvalue}
            onChange={(e) => setInpValue(e.target.value)}
            className="w-full p-2 border outline-none bg-transparent text-lg border-zinc-800 rounded-lg placeholder:text-sm relative"
            type="text"
            placeholder="Search anythings.."
          />
          {inpvalue.length > 0 && (
            <i
              onClick={closeBtn}
              className="text-2xl text-zinc-600 cursor-pointer  ri-close-fill"
            ></i>
          )}

          <div className=" max-h-[30vh]  z-[100] absolute top-[90%] left-[18%] w-[60%] bg-zinc-400  lg:max-h-[50vh] rounded overflow-auto">
            {searchData.map((data, index) => {
              return (
                <Link
                  to={`/${data.media_type}/details/${data.id}`}
                  key={index}
                  className=" z-[100] py-5 px-3 border-b-2 hover:text-black hover:bg-zinc-500 duration-200  text-zinc-600 flex justify-start items-center border-zinc-300"
                >
                  <img
                    className="w-[10vh] h-[10vh] object-cover mr-2"
                    src={
                      data.backdrop_path ||
                      data.poster_path ||
                      data.profile_path
                        ? `https://image.tmdb.org/t/p/original/${
                            data.backdrop_path ||
                            data.poster_path ||
                            data.profile_path
                          }`
                        : noimg
                    }
                    alt=""
                  />
                  <span>
                    {data.title ||
                      data.name ||
                      data.original_name ||
                      data.original_title}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  ) : (
    <h1>Loading....</h1>
  );
};

export default TopNav;
