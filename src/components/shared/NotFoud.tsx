import { SearchX, Home, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050816] px-4">

            {/* FLOATING WORLD LAYER */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {/* GRID BG */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-size-[32px_32px] opacity-30" />

                {/* Glow Effects */}
                <div className="absolute left-0 top-20 h-100 w-100 rounded-full bg-cyan-500/10 blur-3xl" />
                <div className="absolute right-0 top-40 h-100 w-100 rounded-full bg-purple-500/10 blur-3xl " />

                {/* Moving Grid Glow Sweep */}
                <div className="absolute h-[200%] w-[200%] animate-sweep opacity-20 bg-[radial-gradient(circle,#22d3ee10_1px,transparent_1px)] bg-size-[40px_40px]" />

                {/* SHAPE 1 - DIAGONAL TRAVEL */}
                <div className="absolute h-16 w-16 border border-cyan-500/30 animate-path-1" />

                {/* SHAPE 2 - LEFT TO RIGHT LOOP */}
                <div className="absolute h-12 w-12 rotate-45 border border-cyan-400/30 animate-path-2" />

                {/* SHAPE 3 - BOUNCING ACROSS SCREEN */}
                <div className="absolute h-20 w-20 rounded-full border border-cyan-500/20 animate-path-3" />

                {/* SHAPE 4 - FAST SMALL PARTICLE */}
                <div className="absolute h-3 w-3 rounded-full bg-cyan-400/60 animate-path-4" />

                {/* SHAPE 5 - BIG ORBIT BOX */}
                <div className="absolute h-28 w-28 border border-purple-500/20 animate-path-5" />

            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-2xl border border-zinc-800 bg-[#0b1120]">

                {/* Accent */}
                <div className="h-1 bg-linear-to-r from-transparent via-cyan-400 to-transparent" />

                <div className="flex flex-col items-center px-8 py-14 text-center">

                    <div className="flex h-24 w-24 items-center justify-center border border-cyan-500/30 bg-cyan-500/10">
                        <SearchX
                            size={50}
                            className="text-cyan-400"
                        />
                    </div>

                    <h1 className="mt-8 text-7xl font-black tracking-wider text-white">
                        404
                    </h1>

                    <h2 className="mt-4 text-3xl font-bold text-white">
                        Mission Failed
                    </h2>

                    <p className="mt-4 max-w-lg text-zinc-400">
                        The page you're looking for doesn't exist or has been
                        moved. Return to the lobby and continue your journey.
                    </p>

                    <div className="mt-10 flex w-full flex-col gap-4 sm:flex-row sm:justify-center">

                        <Link
                            to="/"
                            className="
                                flex items-center justify-center gap-2
                                border border-cyan-500
                                bg-cyan-500
                                px-6 py-3
                                font-semibold
                                text-black
                                transition-all duration-300
                                hover:bg-cyan-400
                            "
                        >
                            <Home size={18} />
                            Home
                        </Link>

                        <button
                            onClick={() => navigate("/", { replace: true })}
                            className="
                                flex cursor-pointer items-center justify-center gap-2
                                border border-zinc-700
                                bg-[#09111f]
                                px-6 py-3
                                font-semibold
                                text-white
                                transition-all duration-300
                                hover:border-cyan-500
                                hover:text-cyan-300
                            "
                        >
                            <ArrowLeft size={18} />
                            Go Back
                        </button>

                    </div>

                </div>

            </div>

        </section>
    );
};

export default NotFound;