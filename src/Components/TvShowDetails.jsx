import React, { useEffect } from "react";
import {
    Link,
    Outlet,
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Components/Loading";
import noImage from "/noimage.jpg";
import HorizontalCard from "../templates/HorizontalCard";
import tvAction from "../../actions/tvAction";
import { removeTv } from "../../reducer/tvReducer";

const TvShowDetails = () => {
    const { pathname } = useLocation();
    const { info } = useSelector((state) => state.tv);
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(tvAction(Number(id)));
        return () => {
            dispatch(removeTv());
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
                className="w-full min-h-screen px-12 relative"
            >
                <nav className="w-full h-[8vh] flex  sm:flex-row items-center justify-between text-zinc-300 text-center gap-4 sm:gap-0">
                    <div className="flex gap-4 sm:gap-10 text-2xl">
                        <i
                            onClick={() => navigate(-1)}
                            className="hover:text-[#6556CD] ri-arrow-left-line cursor-pointer"
                        ></i>

                        <a target="_blank" href={`${info.detail.homepage}`}>
                            <i className="hover:text-[#6556CD] duration-200 ri-external-link-fill"></i>
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

                    <button
                        onClick={() => navigate("/")}
                        className="mt-2 hover:bg-[#6556CD] duration-200 text-md sm:text-lg px-1 sm:px-4 py-1 border border-zinc-300"
                    >
                        Home
                    </button>
                </nav>

                {/* Main Content */}
                <div className="w-full flex flex-col gap-6 md:flex-row mt-2">
                    <div className="md:w-[30%]">
                        <img
                            className="w-full h-[70vh] object-cover object-top-right rounded-lg shadow-lg"
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
                            alt="poster"
                        />
                    </div>

                    <div className="content md:w-[70%] mt-4 md:mt-0 text-white">
                        <h1 className="text-4xl font-bold">
                            {info.detail.title ||
                                info.detail.original_name ||
                                info.detail.original_title}
                            <small className="text-lg">
                                ({info.detail.first_air_date.split("-")[0]})
                            </small>
                        </h1>
                        <div className="flex flex-wrap gap-4 mt-4 mb-2">
                            <div className="text-xl text-white w-[7vh] h-[7vh] bg-yellow-600 flex items-center justify-center rounded-full">
                                {(info.detail.vote_average * 10).toFixed()}%
                            </div>
                            <h1 className="text-xl font-semibold leading-5">
                                {info.detail.first_air_date} (
                                {info.detail.status})
                            </h1>
                            <h1>
                                {info.detail.genres
                                    .map((g) => g.name)
                                    .join(",")}
                            </h1>
                            <h1>
                                {info.detail.runtime ||
                                    info.detail.episode_run_time}{" "}
                                mins
                            </h1>
                        </div>
                        <p className="text-xl font-semibold italic mt-2 mb-2">
                            {info.detail.tagline}
                        </p>
                        <h1 className="text-xl font-semibold my-2">Overview</h1>
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
                            className="bg-[#6556CD] hover:bg-[#5b49d1] duration-200 px-4 py-3 rounded-lg"
                            to={`${pathname}/trailer`}
                        >
                            <i className="fa-solid fa-play mr-1"></i>Play
                            Trailer
                        </Link>
                    </div>
                </div>

                {/* Additional Link */}
                <div className="w-full flex flex-wrap gap-5 mt-10 text-white font-bold text-xl">
                    {info.watchProvider && info.watchProvider.flatrate && (
                        <div className="flex flex-col gap-2">
                            <h1>Stream</h1>
                            {info.watchProvider.flatrate.map((f, i) => (
                                <img
                                    key={i}
                                    title={`${f.provider_name}`}
                                    className="w-[7vh] object-cover rounded-lg shadow-lg"
                                    src={`https://image.tmdb.org/t/p/original/${f.logo_path}`}
                                    alt={f.provider_name}
                                />
                            ))}
                        </div>
                    )}
                    {info.watchProvider && info.watchProvider.buy && (
                        <div className="flex flex-col gap-2">
                            <h1>Buy</h1>
                            <div className="flex gap-4">
                                {info.watchProvider.buy.map((b, i) => (
                                    <img
                                        key={i}
                                        title={`${b.provider_name}`}
                                        className="w-[7vh] object-cover rounded-lg shadow-lg"
                                        src={`https://image.tmdb.org/t/p/original/${b.logo_path}`}
                                        alt={b.provider_name}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                    {info.watchProvider && info.watchProvider.rent && (
                        <div className="flex flex-col gap-2">
                            <h1>Rent</h1>
                            <div className="flex gap-4">
                                {info.watchProvider.rent.map((r, i) => (
                                    <img
                                        key={i}
                                        title={`${r.provider_name}`}
                                        className="w-[7vh] object-cover rounded-lg shadow-lg"
                                        src={`https://image.tmdb.org/t/p/original/${r.logo_path}`}
                                        alt={r.provider_name}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Seasons-details */}
                <hr className="mt-8 mb-4 border-none h-[2px] bg-zinc-500" />
                <div className="text-white">
                    <h1 className="text-2xl font-semibold mb-2">Seasons</h1>
                    <div className="w-full flex gap-4 overflow-x-auto overflow-y-hidden">
                        {info.detail.seasons.map((s, i) => (
                            <div className="min-w-[27vh] relative" key={i}>
                                <img
                                    className="h-[40vh] object-cover object-top-right rounded-lg shadow-lg"
                                    src={
                                        s.poster_path ||
                                        s.backdrop_path ||
                                        s.profile_path
                                            ? `https://image.tmdb.org/t/p/original/${
                                                  s.poster_path ||
                                                  s.backdrop_path ||
                                                  s.profile_path
                                              }`
                                            : noImage
                                    }
                                    alt=""
                                />
                                <h1 className="text-xl text-zinc-300">
                                    {s.name}
                                </h1>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recommendations */}
                <hr className="mt-8 mb-4 border-none h-[2px] bg-zinc-500" />
                <div className="text-white">
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

export default TvShowDetails;
