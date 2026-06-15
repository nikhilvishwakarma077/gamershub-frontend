
import {
    Users,
    Plus,
} from "lucide-react";
import image1 from "../../assets/trophy.webp"
import image2 from "../../assets/image2.webp"
import image3 from "../../assets/image3.webp"
import image4 from "../../assets/image4.webp"
import image5 from "../../assets/image5.webp"
import image6 from "../../assets/image6.webp"
import image7 from "../../assets/achieve.webp"
import image8 from "../../assets/image8.webp"


import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const HeroSection = () => {


    const heroImages = [
        image1,
        image5,
        image2,
        image3,
        image4,
        image6,
        image7,
        image8,

    ];
    const navigate = useNavigate()

    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % heroImages.length);
        }, 2500);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative min-h-screen overflow-hidden  bg-[#050816] text-white">
            {/* Background Image */}
            <div className="absolute inset-0">
                {/* <img
                    src={bgImage}
                    alt="Gaming Trophy"
                    className="h-full w-full z-20 object-cover object-[65%_center]  md:object-center opacity-100"
                /> */}


                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-linear-to-r from-[#050816] via-[#050816]/10 to-[#050816]/20" />

                {/* Neon Glow */}
                <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.12),transparent_0%)]" />
            </div>

            {/* Main Content */}
            <section className="relative overflow-hidden">
                <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 pt-28 pb-16 lg:px-10">

                    <div
                        className="
                grid
                w-full
                items-center
                gap-12
                lg:grid-cols-2
                lg:gap-20
            "
                    >

                        {/* RIGHT IMAGE - MOBILE FIRST */}
                        <div
                            className="
                    relative
                    order-1
                    flex
                    items-center
                    justify-center

                    lg:order-2
                "
                        >
                            {/* Main Cyan Glow */}
                            <div className="absolute left-1/2 top-1/2 h-180 w-200 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/20 blur-3xl" />

                            {/* Secondary Glow */}
                            <div className="absolute h-100 w-100 rounded-full bg-cyan-400/40 blur-[80px]" />

                            {/* Decorative Rings */}
                            <div className="absolute h-115 w-115 rounded-full border border-cyan-500/10" />
                            <div className="absolute h-125 w-125 rounded-full border border-cyan-500/5" />

                            {/* Floating Shapes */}
                            <div className="absolute left-8 top-16 h-15 w-15 rotate-12 border border-cyan-500/20 animate-character-float" />

                            <div className="absolute right-12 top-24 h-10 w-10 rotate-45 border border-cyan-500/30 animate-character-float" />

                            <div className="absolute bottom-16 left-16 h-10 w-10 rotate-12 border border-cyan-500/20 animate-character-float" />

                            <div className="absolute left-0 top-10 h-20 w-20 rotate-12 border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-md animate-character-float" />

                            <div className="absolute bottom-16 right-0 h-14 w-14 rotate-45 border border-cyan-500/20 bg-cyan-500/10 backdrop-blur-md animate-character-float" />

                            {/* SLIDER */}
                            <div
                                className="
                        relative h-125 max-h-150 border border-cyan-500 w-full max-w-100 overflow-hidden rounded-2xl
                    "
                            >
                                <div
                                    className="flex h-full transition-transform duration-700 ease-in-out"
                                    style={{
                                        transform: `translateX(-${currentImage * 100}%)`,
                                    }}
                                >
                                    {heroImages.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image}
                                            alt={`hero-${index}`}
                                            className="
                                    h-full
                                    w-full
                                    shrink-0
                                    object-cover
                                "
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Indicators */}
                            <div className="absolute -bottom-8 hidden md:flex gap-2">
                                {heroImages.map((_, index) => (
                                    <div
                                        key={index}
                                        className={`h-2 rounded-full transition-all duration-500 ${index === currentImage
                                            ? "w-8 bg-cyan-400"
                                            : "w-2 bg-cyan-400/40"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* LEFT CONTENT */}
                        <div
                            className="
                    order-2
                    mx-auto
                    max-w-2xl
                    text-left

                    lg:order-1
                    lg:mx-0
                "
                        >
                            {/* Badge */}
                            <div className="mb-6 inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-[11px] font-semibold tracking-[0.25em] text-cyan-300 backdrop-blur-md sm:text-xs">
                                CONNECT | COMPETE | CONQUER
                            </div>

                            {/* Heading */}
                            <h1 className="font-black uppercase leading-[0.95] tracking-tight">
                                <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                                    Connect.
                                </span>

                                <span className="mt-2 block text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                                    Play.
                                </span>

                                <span className="mt-2 block bg-linear-to-r from-cyan-300 to-cyan-500 bg-clip-text text-4xl text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
                                    Rise Together.
                                </span>
                            </h1>

                            {/* Description */}
                            <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-zinc-300 sm:text-base lg:mx-0 lg:text-lg">
                                GamerHub is the ultimate platform for esports players to
                                find teammates, join scrims, showcase their profiles,
                                and build their gaming legacy together.
                            </p>

                            {/* Buttons */}
                            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">

                                <button
                                    className="group flex items-center justify-center gap-3 bg-linear-to-r from-cyan-400 to-cyan-500 px-7 py-4 font-semibold text-black transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(0,255,255,0.4)]"
                                    onClick={() => navigate("/find-player")}
                                >
                                    <Users className="h-5 w-5" />
                                    Find Players
                                </button>

                                <button
                                    className="group flex items-center justify-center gap-3 border border-cyan-400 bg-black/20 px-7 py-4 font-semibold text-cyan-300 backdrop-blur-md transition-all duration-300 hover:bg-cyan-400/10 hover:shadow-[0_0_20px_rgba(0,255,255,0.2)]"
                                    onClick={() => navigate("/create-request")}
                                >
                                    Create Request
                                    <Plus className="h-5 w-5" />
                                </button>

                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </section>
    );
};

export default HeroSection;