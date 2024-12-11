import React, { useState } from "react";
import { Link } from "react-router-dom";

const SideNav = () => {
    const [menubtn, setMenubtn] = useState(true);

    return (
        <div className="px-4 py-2 lg:w-[20%] lg:h-full lg:border-r-2 lg:p-10">
            <h1 className="sm:h-[10vh] flex justify-between items-center sm:w-full text-2xl font-bold">
                <div>
                    <i className="mr-2 text-3xl text-[#6556CD] ri-tv-fill"></i>
                    <span className="text-[#6556CD] drop-shadow-lg">
                        𝐒𝐏𝐌𝐨𝐯𝐢𝐞𝐬.
                    </span>
                </div>
                <div>
                    <i
                        onClick={() => setMenubtn((prev) => !prev)}
                        className="cursor-pointer hover:text-[#6556CD] fa-solid fa-bars lg:hidden"
                    ></i>
                </div>
            </h1>

            {/* Mobile Navigation Menu */}
            <nav
                className={`lg:hidden absolute top-[20%] sm:top-[25%] right-0 w-[70%] bg-[#1F1E24] p-3 z-50 ${
                    menubtn
                        ? "opacity-0 pointer-events-none"
                        : "opacity-100 pointer-events-auto"
                } transition-all duration-300`}
            >
                <h1 className="text-lg font-semibold mb-3">News Feed</h1>
                <Link
                    to="/trending"
                    className="block hover:bg-[#6556CD] rounded-lg duration-200 p-3"
                >
                    <i className="mr-2 ri-fire-fill"></i>
                    Trending
                </Link>
                <Link
                    to="/popular"
                    className="block hover:bg-[#6556CD] rounded-lg duration-200 p-3"
                >
                    <i className="mr-2 ri-bard-fill"></i>
                    Popular
                </Link>
                <Link
                    to="/movie"
                    className="block hover:bg-[#6556CD] rounded-lg duration-200 p-3"
                >
                    <i className="mr-2 ri-movie-2-fill"></i>
                    Movies
                </Link>
                <Link
                    to="/tv"
                    className="block hover:bg-[#6556CD] rounded-lg duration-200 p-3"
                >
                    <i className="mr-2 ri-tv-2-fill"></i>
                    Tv Shows
                </Link>
                <Link
                    to="/person"
                    className="block hover:bg-[#6556CD] rounded-lg duration-200 p-3"
                >
                    <i className="mr-2 ri-team-fill"></i>
                    People
                </Link>
            </nav>

            <hr className="my-2 bg-transparent h-[1px] bg-zinc-200" />

            {/* Desktop Navigation Menu */}
            <nav className="hidden lg:block lg:mt-4 lg:flex lg:flex-col lg:gap-3">
                <h1 className="lg:text-lg lg:font-semibold">News Feed</h1>
                <Link
                    to="/trending"
                    className="hover:bg-[#6556CD] rounded-lg duration-200 p-3"
                >
                    <i className="mr-2 ri-fire-fill"></i>
                    Trending
                </Link>
                <Link
                    to="/popular"
                    className="hover:bg-[#6556CD] rounded-lg duration-200 p-3"
                >
                    <i className="mr-2 ri-bard-fill"></i>
                    Popular
                </Link>
                <Link
                    to="/movie"
                    className="hover:bg-[#6556CD] rounded-lg duration-200 p-3"
                >
                    <i className="mr-2 ri-movie-2-fill"></i>
                    Movies
                </Link>
                <Link
                    to="/tv"
                    className="hover:bg-[#6556CD] rounded-lg duration-200 p-3"
                >
                    <i className="mr-2 ri-tv-2-fill"></i>
                    Tv Shows
                </Link>
                <Link
                    to="/person"
                    className="hover:bg-[#6556CD] rounded-lg duration-200 p-3"
                >
                    <i className="mr-2 ri-team-fill"></i>
                    People
                </Link>
            </nav>

            {/* Footer Links (Desktop) */}
            <nav className="hidden lg:block lg:mt-4 lg:flex lg:flex-col lg:gap-3">
                <Link
                    to="/about"
                    className="hover:bg-[#6556CD] rounded-lg duration-200 p-3"
                >
                    <i className="mr-2 ri-information-fill"></i>
                    About SPMovies
                </Link>
                <Link
                    to="/contact-us"
                    className="hover:bg-[#6556CD] rounded-lg duration-200 p-3"
                >
                    <i className="mr-2 ri-phone-fill"></i>
                    Contact Us
                </Link>
            </nav>
        </div>
    );
};

export default SideNav;
