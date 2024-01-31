import React, { useEffect, useState } from "react";
import personAction from "../../actions/personAction";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removePerson } from "../../reducer/personReducer";
import Loading from "../Components/Loading";
import noImage from "/noimage.jpg";
import HorizontalCard from "../templates/HorizontalCard";
import DropDown from "../templates/DropDown";
import Card from "../templates/Card";

const PersonDetails = () => {
  const [filterData, setFilterData] = useState("movie");
  const { info } = useSelector((state) => state.person);

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(personAction(id));
    return () => {
      dispatch(removePerson());
    };
  }, [id, filterData]);
  return info ? (
    <div className="w-full min-h-[160vh] bg-[#1F1E24] text-white px-12">
      {/* navigaton */}

      <nav className="h-[8vh] py-3 text-3xl">
        <i
          onClick={() => navigate(-1)}
          className=" hover:text-[#6556CD] ri-arrow-left-line cursor-pointer"
        ></i>
      </nav>

      <div className="flex w-full mt-4">
        {/* Image & social detail */}

        <div className="w-[25%] flex flex-col pl-12">
          <img
            className="h-[45vh] object-cover rounded-lg shadow-[8px_17px_38px_2px_rgba(0,0,0,0.3)]"
            src={
              info.detail.poster_path ||
              info.detail.backdrop_path ||
              info.detail.profile_path
                ? `https://image.tmdb.org/t/p/original/${
                    info.detail.poster_path ||
                    info.detail.backdrop_path ||
                    info.detail.profile_path
                  }`
                : noImage
            }
            alt=""
          />
          <hr className="border-none h-[2px] bg-white mt-3" />

          <div className="flex gap-x-6 my-2 text-2xl">
            <a
              target="_blank"
              href={`https://www.instagram.com/${info.external_ids.instagram_id}`}
            >
              <i className="hover:text-[#6556CD] duration-200 fa-brands fa-instagram"></i>
            </a>

            <a
              target="_blank"
              href={`https://twitter.com/${info.external_ids.twitter_id}`}
            >
              <i className="hover:text-[#6556CD] duration-200 fa-brands fa-x-twitter"></i>
            </a>

            <a
              target="_blank"
              href={`https://www.wikidata.org/wiki/${info.external_ids.wikidata_id}`}
            >
              <i className="hover:text-[#6556CD] duration-200 fa-brands fa-wikipedia-w"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.imdb.com/title/${info.external_ids.imdb_id}/`}
            >
              <i className="hover:text-[#6556CD] duration-200 fa-brands fa-imdb"></i>
            </a>
          </div>
          <div className="flex flex-col">
            <h1 className="font-semibold text-zinc-300">Know for</h1>
            <p className="text-zinc-400 mb-2">
              {info.detail.known_for_department}
            </p>
            <h1 className="font-semibold text-zinc-300">Gender</h1>
            <p className="text-zinc-400 mb-2">
              {info.detail.gender === 1 ? "Female" : "Male"}
            </p>
            <h1 className="font-semibold text-zinc-300">Birthday</h1>
            <p className="text-zinc-400 mb-2">{info.detail.birthday}</p>
            <h1 className="font-semibold text-zinc-300">Deathday</h1>
            {info.detail.deathday ? (
              <p className="text-zinc-400 mb-2">{info.detail.birthday}</p>
            ) : (
              <p className="text-zinc-400 mb-2">Still Alive</p>
            )}
            {info.detail.place_of_birth && 
                    <div>
                    <h1 className="font-semibold text-zinc-300">Place Of Birth</h1>
                    <p className="text-zinc-400 mb-2">{info.detail.place_of_birth}</p>
                    </div>}

              
                     
                                            

            
          </div>
        </div>

        {/* Name $ Details */}

        <div className="w-[75%] ml-[3%] text-zinc-400">
          <h1 className="text-4xl font-bold ">{info.detail.name}</h1>
          <h1 className="mt-2 text-lg">Biography</h1>
          <p className="mb-2">{info.detail.biography}</p>
          <h1 className="mb-2 text-lg">Known For</h1>
          <HorizontalCard data={info.combined_credits.cast} />
          <div className="flex items-center justify-between mb-2">
            <h1 className="mb-2 text-lg">Acting</h1>

            <DropDown
              title={"Filter"}
              options={["tv", "movie"]}
              func={(e) => setFilterData(e.target.value)}
            />
          </div>
          <div className="w-full max-h-[40vh] border shadow-lg shadow-[rgba(255,255,255,.1)] overflow-x-hidden overscroll-y-auto list-inside px-2">
            {info[filterData + "_credits"].map((c, i) => {
              return (
                <li
                  key={i}
                  className="w-full hover:text-white hover:bg-[#19181d] duration-200 my-2 px-2 py-1"
                >
                  <Link to={`/${filterData}/details/${c.id}`} className="">
                    <span>
                      {c.title ||
                        c.name ||
                        c.name ||
                        c.original_name ||
                        c.original_title}
                    </span>
                    <span className="block ml-5">{c.character&&`Character Name:${c.character}`}</span>
                  </Link>
                </li>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default PersonDetails;
