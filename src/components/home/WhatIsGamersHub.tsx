import gamerCharacter from "../../assets/gamerCharacter.webp"

const WhatIsGamersHub = () => {
    return (
        <section className="relative overflow-hidden bg-black py-20 sm:py-24">
            {/* Decorative Background */}
            <div className="absolute inset-0">
                <div className="absolute left-[-120px] top-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
                <div className="absolute bottom-10 right-[-100px] h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

                <div className="absolute left-10 top-20 h-24 w-24 rotate-12 border border-cyan-500/20" />
                <div className="absolute bottom-20 right-16 h-32 w-32 rotate-45 border border-cyan-500/20" />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid items-center gap-14 lg:grid-cols-2">
                    {/* LEFT CONTENT */}
                    <div>


                        <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                            What Is{" "}
                            <span className="text-cyan-400">GamersHub?</span>
                        </h2>

                        <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
                            GamersHub is a gaming ecosystem where players create
                            professional gaming profiles, participate in tournaments,
                            showcase achievements, and connect with the community.
                        </p>

                        <div className="mt-10 grid gap-4 sm:grid-cols-2">
                            {/* Feature 1 */}
                            <div className="rounded-2xl border border-cyan-500/20 bg-zinc-950/80 p-4 backdrop-blur">
                                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10">
                                    <svg
                                        className="h-6 w-6 text-cyan-400"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <circle cx="12" cy="8" r="4" />
                                        <path d="M4 20c0-4 3-6 8-6s8 2 8 6" />
                                    </svg>
                                </div>

                                <h3 className="font-semibold text-white">
                                    Gamer Profiles
                                </h3>

                                <p className="mt-1 text-sm text-zinc-400">
                                    Build a unique gaming identity and showcase your skills.
                                </p>
                            </div>

                            {/* Feature 2 */}
                            <div className="rounded-2xl border border-cyan-500/20 bg-zinc-950/80 p-4 backdrop-blur">
                                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10">
                                    <svg
                                        className="h-6 w-6 text-cyan-400"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path d="M6 3h12v5c0 5-3 8-6 9-3-1-6-4-6-9V3Z" />
                                        <path d="M8 21h8" />
                                    </svg>
                                </div>

                                <h3 className="font-semibold text-white">
                                    Achievements
                                </h3>

                                <p className="mt-1 text-sm text-zinc-400">
                                    Highlight your milestones and gaming accomplishments.
                                </p>
                            </div>

                            {/* Feature 3 */}
                            <div className="rounded-2xl border border-cyan-500/20 bg-zinc-950/80 p-4 backdrop-blur">
                                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10">
                                    <svg
                                        className="h-6 w-6 text-cyan-400"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path d="M3 12h18" />
                                        <path d="M12 3v18" />
                                        <circle cx="12" cy="12" r="9" />
                                    </svg>
                                </div>

                                <h3 className="font-semibold text-white">
                                    Tournaments
                                </h3>

                                <p className="mt-1 text-sm text-zinc-400">
                                    Join competitive events and challenge top players.
                                </p>
                            </div>

                            {/* Feature 4 */}
                            <div className="rounded-2xl border border-cyan-500/20 bg-zinc-950/80 p-4 backdrop-blur">
                                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10">
                                    <svg
                                        className="h-6 w-6 text-cyan-400"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <circle cx="7" cy="8" r="3" />
                                        <circle cx="17" cy="8" r="3" />
                                        <path d="M2 20c0-3 2-5 5-5s5 2 5 5" />
                                        <path d="M12 20c0-3 2-5 5-5s5 2 5 5" />
                                    </svg>
                                </div>

                                <h3 className="font-semibold text-white">
                                    Community
                                </h3>

                                <p className="mt-1 text-sm text-zinc-400">
                                    Connect with gamers, teams, and esports communities.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT CHARACTER */}
                    <div className="relative flex items-center justify-center">
                        {/* Main Cyan Glow */}
                        <div className="absolute h-112.5 w-112.5 rounded-full bg-cyan-500/20 blur-[120px]" />

                        {/* Secondary Glow */}
                        <div className="absolute h-75 w-75 rounded-full bg-cyan-400/10 blur-[80px]" />

                        {/* Decorative Rings */}
                        <div className="absolute h-105 w-105 rounded-full border border-cyan-500/10" />
                        <div className="absolute h-[500px] w-[500px] rounded-full border border-cyan-500/5" />
                       

                         {/* Decorative Shape 1 */}
                        <div className="absolute left-0 top-10 h-20 w-20 rotate-12 border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-md animate-float-rotate" />

                        {/* Decorative Shape 2 */}
                        <div className="absolute bottom-16 right-0 h-14 w-14 rotate-45 border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-md animate-orbit animate-float-slow" />

                        {/* Decorative Shape 3 */}
                        <div className="absolute right-12 top-0 h-10 w-10 rounded-full border border-cyan-400/30 bg-cyan-400/10 animate-pulse-glow" />

                        <div className="absolute animate-orbit right-12 top-24 h-8 w-8 rotate-45 border border-cyan-500/30" />

                        {/* Character */}
                        <img
                            src={gamerCharacter}
                            alt="Gaming Character"
                            className="
    relative
    z-10
    h-auto
    max-h-[700px]
    w-full
    max-w-[500px]
    object-contain
    drop-shadow-[0_0_40px_rgba(6,182,212,0.35)]
    animate-character-float
    select-none
    pointer-events-none
  "
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhatIsGamersHub;