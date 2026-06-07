
import {
    Trophy,
    Users,
    // ShieldCheck,
    // Crosshair,
    Plus,
} from "lucide-react";
import bgImage from "../../assets/ffws-bg.png"
import { useNavigate } from "react-router-dom";

const HeroSection = () => {

    const navigate = useNavigate()

    return (
        <section className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src={bgImage}
                    alt="Gaming Trophy"
                    className="h-full w-full object-cover object-[65%_center]  md:object-center opacity-100  scale-105"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-linear-to-r from-[#050816] via-[#050816]/20 to-[#050816]/40" />

                {/* Neon Glow */}
                <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.12),transparent_50%)]" />
            </div>

            {/* Main Content */}
            <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-20 lg:px-10">
                <div className="grid items-center gap-16 lg:grid-cols-2">
                    {/* Left Content */}
                    <div className="max-w-xl">
                        {/* Badge */}
                        <div className="mb-6 inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-500/10 px-5 py-2 text-xs font-semibold tracking-[0.25em] text-cyan-300 backdrop-blur-md ">
                            CONNECT | COMPETE | CONQUER
                        </div>

                        {/* Heading */}
                        <h1 className="leading-none">
                            <span className="block text-5xl font-black uppercase tracking-tight sm:text-6xl lg:text-7xl">
                                Connect.
                            </span>

                            <span className="mt-2 block text-5xl font-black uppercase tracking-tight sm:text-6xl lg:text-7xl">
                                Play.
                            </span>

                            <span className="mt-2 block bg-linear-to-r from-cyan-300 to-cyan-500 bg-clip-text text-5xl font-black uppercase tracking-tight text-transparent sm:text-6xl lg:text-7xl">
                                Rise Together.
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="mt-8 max-w-lg text-base leading-relaxed text-zinc-300 sm:text-lg">
                            GamerHub is the ultimate platform for esports players to
                            find teammates, join scrims, and build their legacy together.
                        </p>

                        {/* CTA Buttons */}
                        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                            <button className="group flex items-center justify-center gap-3 rounded-xl bg-linear-to-r from-cyan-400 to-cyan-500 px-7 py-4 font-semibold text-black transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(0,255,255,0.4)] cursor-pointer"
                            onClick={()=>{
                                navigate("/find-player")
                            }}
                            >
                                <Users className="h-5 w-5" />
                                Find Players
                            </button>

                            <button className="group flex items-center justify-center gap-3 rounded-xl border border-cyan-400/40 bg-black/20 px-7 py-4 font-semibold text-cyan-300 backdrop-blur-md transition-all duration-300 hover:border-cyan-300 hover:bg-cyan-400/10 hover:shadow-[0_0_20px_rgba(0,255,255,0.2)] cursor-pointer"
                            onClick={()=>{
                                navigate("/create-request")
                            }}
                            >
                                Create Request
                                <Plus className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    {/* Right Trophy */}
                    <div className="relative hidden items-center justify-center lg:flex">
                        {/* Glow Behind Trophy */}
                        <div className="absolute h-125 w-125 rounded-full bg-cyan-500/10 blur-3xl" />


                    </div>
                </div>

                {/* Bottom Feature Cards */}
                <div className="mt-20 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                    {/* Card 1 */}
                    <div className="group rounded-2xl border border-cyan-400/10 bg-white/3 p-5 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/40 hover:bg-cyan-500/5">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                            <Users />
                        </div>

                        <h3 className="text-lg font-bold uppercase tracking-wide text-cyan-300">
                            Find Teammates
                        </h3>

                        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                            Connect with skilled players that match your style and goals.
                        </p>
                    </div>

                    {/* Card 2 */}
                    {/* <div className="group rounded-2xl border border-cyan-400/10 bg-white/3 p-5 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/40 hover:bg-cyan-500/5">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                            <Crosshair />
                        </div>

                        <h3 className="text-lg font-bold uppercase tracking-wide text-cyan-300">
                            Join Scrims
                        </h3>

                        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                            Participate in scrims and improve your competitive gameplay.
                        </p>
                    </div> */}

                    {/* Card 3 */}
                    <div className="group rounded-2xl border border-cyan-400/10 bg-white/3 p-5 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/40 hover:bg-cyan-500/5">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                            <Trophy />
                        </div>

                        <h3 className="text-lg font-bold uppercase tracking-wide text-cyan-300">
                            Build Legacy
                        </h3>

                        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                            Play, grow, and create your esports journey with your team.
                        </p>
                    </div>

                    {/* Card 4 */}
                    {/* <div className="group rounded-2xl border border-cyan-400/10 bg-white/3 p-5 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/40 hover:bg-cyan-500/5">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                            <ShieldCheck />
                        </div>

                        <h3 className="text-lg font-bold uppercase tracking-wide text-cyan-300">
                            Trusted Community
                        </h3>

                        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                            Verified players and a safe environment to connect and compete.
                        </p>
                    </div> */}
                </div>
            </div>
        </section>
    );
};

export default HeroSection;