import { useNavigate } from "react-router-dom";
import about from "/aboutImg.png";
import aboutbg from "/innerbg.svg";

const About = () => {
    const navigate = useNavigate();
    return (
        <div
            style={{
                backgroundImage: `radial-gradient(at 25%top,#32112c 0,#0a1526 40%)`,
            }}
            className="w-full min-h-[100vh] z-[0]"
        >
            <div
                className="w-full h-full z-[100]"
                style={{
                    backgroundImage: `url(${aboutbg})`,
                    backgroundPosition: "cover",
                    backgroundSize: "center",
                }}
            >
                <div className=" sticky top-0  w-full px-[3%] py-2">
                    <h1 className="text-2xl font-semibold text-zinc-600 ">
                        <i
                            onClick={() => navigate(-1)}
                            className=" hover:text-[#6556CD] ri-arrow-left-line cursor-pointer"
                        ></i>
                        About SPMovies.
                    </h1>
                </div>

                <div className="z-[999] w-full h-full flex justify-center items-center flex-col relative text-white">
                    <h1 className="z-[0] text-9xl font-black text-white italic tracking-wider">
                        Hi There,
                    </h1>
                    <img className="" src={about} alt="" />
                    <h1 className="text-6xl font-bold">
                        Let&apos;s talk about SPMovies.
                    </h1>
                    <p className="text-2xl">
                        Its an api based learning movie website Project using
                        React,Redux,ReactPlayer and axios.{" "}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
