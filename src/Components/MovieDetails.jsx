import React, { useEffect } from "react";
import movieAction from "../../actions/movieAction";
import {
    Link,
    Outlet,
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeMovie } from "../../reducer/movieReducer";
import Loading from "../Components/Loading";
import noImage from "/noimage.jpg";
import HorizontalCard from "../templates/HorizontalCard";

const MovieDetails = () => {
    const { pathname } = useLocation();
    const { info } = useSelector((state) => state.movie);
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const ScrollTopFun = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        dispatch(movieAction(id));
        return () => {
            dispatch(removeMovie());
        };
    }, [id]);
    return info ? (
        <>
            <div
                style={{
                    background: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.6),rgba(0,0,0,0.9)),url(https://image.tmdb.org/t/p/original/${
                        info.detail.backdrop_path || info.detail.poster_path
                    })`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                }}
                className="w-full min-h-[130vh] px-4 md:px-12 relative"
            >
                {/* Navigation */}
                <nav className="w-full h-[8vh] flex  sm:flex-row items-center justify-between text-zinc-300 text-center gap-4 sm:gap-0">
                    <div className="flex gap-4 sm:gap-10 text-2xl">
                        <i
                            onClick={() => navigate(-1)}
                            className="hover:text-[#6556CD] ri-arrow-left-line cursor-pointer"
                        ></i>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href={`${info.detail.homepage}`}
                        >
                            <i className="hover:text-[#6556CD] duration-200 ri-external-link-fill"></i>
                        </a>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href={`https://www.wikidata.org/wiki/${info.external_ids.wikidata_id}`}
                        >
                            <i className="hover:text-[#6556CD] duration-200 fa-brands fa-wikipedia-w"></i>
                        </a>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href={`https://www.imdb.com/title/${info.external_ids.imdb_id}/`}
                        >
                            <i className="hover:text-[#6556CD] duration-200 fa-brands fa-imdb"></i>
                        </a>
                    </div>
                    <button
                        onClick={() => navigate("/")}
                        className="mt-2 text-md hover:bg-[#6556CD] duration-200 sm:text-lg px-1 sm:px-4 py-1 border border-zinc-300"
                    >
                        Home
                    </button>
                </nav>

                {/* Main Content */}
                <div className="w-full flex flex-col md:flex-row mt-4 gap-4">
                    {/* Poster */}
                    <div className="w-full md:w-[30%]">
                        <img
                            className="w-full h-auto object-cover object-top rounded-lg shadow-lg"
                            src={
                                info.detail.poster_path ||
                                info.detail.backdrop_path ||
                                info.detail.profile_path
                                    ? `https://image.tmdb.org/t/p/original/${
                                          info.detail.profile_path ||
                                          info.detail.poster_path ||
                                          info.detail.backdrop_path
                                      }`
                                    : noImage
                            }
                            alt=""
                        />
                    </div>

                    {/* Details */}
                    <div className="content w-full md:w-[70%] text-white">
                        <h1 className="text-3xl md:text-5xl font-bold">
                            {info.detail.title ||
                                info.detail.original_name ||
                                info.detail.original_title}
                            <small className="text-lg">
                                ({info.detail.release_date.split("-")[0]})
                            </small>
                        </h1>
                        <div className="flex flex-wrap items-center mt-4 mb-2 gap-4">
                            <div className="text-lg md:text-xl text-white w-[7vh] h-[7vh] bg-yellow-600 flex items-center justify-center rounded-full">
                                {(info.detail.vote_average * 10).toFixed()}
                                <sup>%</sup>
                            </div>
                            <h1 className="text-lg md:text-xl font-semibold">
                                User Rating
                            </h1>
                            <h1 className="text-sm md:text-base">
                                {info.detail.release_date} ({info.detail.status}
                                )
                            </h1>
                            <h1 className="text-sm md:text-base">
                                {info.detail.genres
                                    .map((g) => g.name)
                                    .join(",")}
                            </h1>
                            <h1 className="text-sm md:text-base">
                                {info.detail.runtime} mins
                            </h1>
                        </div>
                        <div>
                            <p className="text-sm md:text-lg font-semibold italic mt-2 mb-2">
                                {info.detail.tagline}
                            </p>
                            <h1 className="text-sm md:text-lg font-semibold my-2">
                                Overview
                            </h1>
                            <p>{info.detail.overview}</p>
                            <Link
                                onClick={ScrollTopFun}
                                className="bg-[#6556CD] hover:bg-[#5b49d1] duration-200 px-4 py-2 mt-4 rounded-lg inline-block"
                                to={`${pathname}/trailer`}
                            >
                                <i className="fa-solid fa-play mr-1"></i>Play
                                Trailer
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Additional Links */}
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 text-white">
                    {info.watchProvider?.flatrate && (
                        <div className="flex flex-col gap-2 items-center">
                            <h1>Stream</h1>
                            {info.watchProvider.flatrate.map((f, i) => (
                                <img
                                    key={i}
                                    title={`${f.provider_name}`}
                                    className="w-[7vh] rounded-lg shadow-lg"
                                    src={`https://image.tmdb.org/t/p/original/${f.logo_path}`}
                                    alt=""
                                />
                            ))}
                        </div>
                    )}
                    {info.watchProvider?.buy && (
                        <div className="flex  gap-2 items-center">
                            <h1>Buy</h1>
                            {info.watchProvider.buy.map((b, i) => (
                                <img
                                    key={i}
                                    title={`${b.provider_name}`}
                                    className="w-[7vh] rounded-lg shadow-lg"
                                    src={`https://image.tmdb.org/t/p/original/${b.logo_path}`}
                                    alt=""
                                />
                            ))}
                        </div>
                    )}
                    {info.watchProvider?.rent && (
                        <div className="flex  gap-2 items-center">
                            <h1>Rent</h1>
                            {info.watchProvider.rent.map((r, i) => (
                                <img
                                    key={i}
                                    title={`${r.provider_name}`}
                                    className="w-[7vh] rounded-lg shadow-lg"
                                    src={`https://image.tmdb.org/t/p/original/${r.logo_path}`}
                                    alt=""
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Recommendations */}
                <div className="text-white mt-10">
                    <h1 className="text-xl md:text-2xl font-semibold mb-4">
                        Recommendations & Similar
                    </h1>
                    <HorizontalCard
                        title="movie"
                        data={
                            info.recommendations.length > 0
                                ? info.recommendations
                                : info.similar
                        }
                    />
                </div>

                <Outlet />
            </div>
        </>
    ) : (
        <Loading />
    );
};

export default MovieDetails;
