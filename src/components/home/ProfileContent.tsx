

const ProfileContent = () => {
    return (
        <div className="space-y-8">
            <div>
                <span className="inline-flex rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1 text-sm font-medium text-cyan-400">
                    GAMER IDENTITY
                </span>

                <h2 className="mt-6 text-4xl font-extrabold text-white sm:text-5xl">
                    Create Your{" "}
                    <span className="text-cyan-400">
                        Gamer Profile
                    </span>
                </h2>

                <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
                    Build a professional gaming identity with custom
                    avatars, achievements, player roles, statistics,
                    social links and gameplay highlights.
                </p>
            </div>

            <div className="relative pl-8">
                {/* Vertical Line */}
                <div className="absolute left-2.75 top-0 h-full w-px bg-linear-to-b from-cyan-400 via-cyan-500/50 to-transparent" />

                {[
                    "Avatar & Banner Customization",
                    "Esports Achievements Showcase",
                    "Define Your Role ",
                    "Social Media Integration",
                    "Upload Clips via YouTube & Instagram",
                    "Detailed Player Statistics",
                ].map((item, index) => (
                    <div
                        key={index}
                        className="group relative mb-8"
                    >
                        {/* Dot */}
                        <div className="absolute -left-8 top-2 h-6 w-6 rounded-full border border-cyan-400 bg-black shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                            <div className="absolute inset-1 rounded-full bg-cyan-400" />
                        </div>

                        <div>
                            <h3 className="font-semibold text-white transition-colors group-hover:text-cyan-400">
                                {item}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>

            <button
                className=" bg-cyan-500 px-6 py-3 font-semibold text-black transition-all hover:scale-105 hover:bg-cyan-400"
            >
                View Profiles
            </button>
        </div>
    )
}

export default ProfileContent