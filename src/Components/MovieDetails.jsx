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
                className="w-[100%] min-h-[130vh] px-12 relative"
            >
                <nav className="w-full h-[8vh] flex items-center justify-between text-zinc-300 ">
                    <div className="flex  gap-10 text-2xl">
                        <i
                            onClick={() => navigate(-1)}
                            className=" hover:text-[#6556CD] ri-arrow-left-line cursor-pointer"
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
                        className=" mt-2 hover:bg-[#6556CD] duration-200 text-lg px-4 py-1 border border-zinc-300"
                    >
                        Home
                    </button>
                </nav>

                {/* Main-Content */}

                <div className="w-full flex mt-2">
                    <div>
                        <img
                            className="h-[70vh] object-cover object-top-right rounded-lg shadow-[8px_17px_38px_2px_rgba(0,0,0,0.3)]"
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

                    <div className="content w-[80%] ml-[4%] text-white">
                        <h1 className="text-5xl font-bold">
                            {info.detail.title ||
                                info.detail.original_name ||
                                info.detail.original_title}

                            <small className="text-lg">
                                ({info.detail.release_date.split("-")[0]})
                            </small>
                        </h1>
                        <div className="flex items-center mt-4 mb-2 gap-4">
                            <div className=" text-xl text-white w-[7vh] h-[7vh] bg-yellow-600 flex items-center justify-center rounded-full">
                                {(info.detail.vote_average * 10).toFixed()}
                                <sup>%</sup>
                            </div>
                            <h1 className="text-xl font-semibold leading-5 w-[20px] ml-1 mr-12">
                                User Rating
                            </h1>

                            <h1>
                                {info.detail.release_date}({info.detail.status})
                            </h1>
                            <h1>
                                {info.detail.genres
                                    .map((g) => g.name)
                                    .join(",")}
                            </h1>
                            <h1>{info.detail.runtime}mins</h1>
                        </div>
                        <div>
                            <p className="text-xl font-semibold italic mt-2 mb-2">
                                {info.detail.tagline}
                            </p>
                            <h1 className="text-xl font-semibold my-2">
                                Overview
                            </h1>
                            <p>{info.detail.overview}</p>
                            <h1 className="font-semibold text-xl my-2">
                                Translated language
                            </h1>
                            <p className="mb-4">
                                {info.translations
                                    .map((l) => l.english_name)
                                    .join(", ")}
                            </p>
                            <Link
                                className=" bg-[#6556CD] hover:bg-[#5b49d1] duration-200 px-4 py-3 rounded-lg "
                                to={`${pathname}/trailer`}
                            >
                                <i className="fa-solid fa-play mr-1"></i>Play
                                Trailer
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Additional Link */}
                <div className="w-[80%]  flex gap-5 mt-10  text-white font-bold text-xl">
                    {info.watchProvider && info.watchProvider.flatrate && (
                        <div className="flex justify-center flex-col gap-2">
                            <h1>Stream</h1>
                            {info.watchProvider.flatrate.map((f, i) => {
                                return (
                                    <img
                                        key={i}
                                        title={`${f.provider_name}`}
                                        className=" w-[7vh] object-cover rounded-lg shadow-[8px_17px_38px_2px_rgba(0,0,0,0.3)]"
                                        src={`https://image.tmdb.org/t/p/original/${f.logo_path}`}
                                        alt=""
                                    />
                                );
                            })}
                        </div>
                    )}
                    {info.watchProvider && info.watchProvider.buy && (
                        <div className="flex justify-center flex-col  gap-2">
                            <h1>Buy</h1>
                            <div className="flex items-center gap-4">
                                {info.watchProvider.buy.map((b, i) => {
                                    return (
                                        <img
                                            key={i}
                                            title={`${b.provider_name}`}
                                            className="w-[7vh] object-cover object-top-right rounded-lg shadow-[8px_17px_38px_2px_rgba(0,0,0,0.3)]"
                                            src={`https://image.tmdb.org/t/p/original/${b.logo_path}`}
                                            alt=""
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    )}
                    {info.watchProvider && info.watchProvider.rent && (
                        <div className="flex justify-center flex-col gap-2">
                            <h1>Rent</h1>
                            <div className="flex items-center gap-4">
                                {info.watchProvider.rent.map((r, i) => {
                                    return (
                                        <img
                                            key={i}
                                            title={`${r.provider_name}`}
                                            className="w-[7vh] object-cover object-top-right rounded-lg shadow-[8px_17px_38px_2px_rgba(0,0,0,0.3)]"
                                            src={`https://image.tmdb.org/t/p/original/${r.logo_path}`}
                                            alt=""
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                {/* Recomandation */}
                <hr className="mt-8 mb-4 border-none h-[2px] bg-zinc-500" />
                <div className=" text-white ">
                    <h1 className="text-2xl font-semibold mb-2">
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
