import { useEffect, useState } from "react";
import SideNav from "../templates/SideNav";
import TopNav from "../templates/TopNav";
import Header from "../templates/Header";
import axios from "../Utils/AxiosGet";
import HorizontalCard from "../templates/HorizontalCard";
import DropDown from "../templates/DropDown";
import Loading from "./Loading";

const Home = () => {
    const [getingTrendingWallpaper, setTrendingWallpaper] = useState(null);

    const [trendingData, setTrendingData] = useState(null);
    const [category, setcategory] = useState("all");

    const getTrendingWallpaper = async () => {
        try {
            const { data } = await axios.get("/trending/all/day");
            let randomNum =
                data.results[Math.floor(Math.random() * data.results.length)];
            setTrendingWallpaper(randomNum);
        } catch (error) {
            console.log(error);
        }
    };

    const getTrending = async () => {
        try {
            const { data } = await axios.get(`/trending/${category}/day`);

            setTrendingData(data.results);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        !getingTrendingWallpaper && getTrendingWallpaper();

        getTrending();
    }, [category]);

    return getingTrendingWallpaper && trendingData ? (
        <>
            <div className=" w-[90%] mx-auto h-full lg:w-full lg:h-full lg:flex text-white">
                <SideNav />
                <div className="w-[100%] lg:w-[80%] lg:h-[100vh] lg:overflow-y-scroll">
                    <div className="top-[-1rem] pt-2 z-[100] sticky  w-full lg:top-[-.5rem]">
                        <TopNav />
                    </div>
                    <Header data={getingTrendingWallpaper} />

                    <div className="flex justify-between items-center p-5 z-[-100]">
                        <h1 className="text-2xl lg:text-3xl font-semibold text-zinc-400 ">
                            Trending
                        </h1>
                        <DropDown
                            title={"Filter"}
                            options={["tv", "movie", "all"]}
                            func={(e) => setcategory(e.target.value)}
                        />
                    </div>
                    <HorizontalCard data={trendingData} />
                </div>
            </div>
        </>
    ) : (
        <Loading />
    );
};

export default Home;
