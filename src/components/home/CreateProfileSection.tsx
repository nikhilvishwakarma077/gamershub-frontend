import { useNavigate } from "react-router-dom";
import gamerCharacter from "../../assets/gamerCharacter2.webp";

const CreateProfilesSection = () => {
    const features = [
        "Select Avatar & Banner",
        "Define Your Role",
        "Social Media Integration",
        "Detailed Player Statistics",
        "Showcase Esports Achievements ",
        "Upload Clips via YouTube & Instagram",
    ];

    const navigate = useNavigate()

    return (
        <section className="relative overflow-hidden bg-black py-16 sm:py-20 lg:py-24">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute left-0 top-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-[100px] sm:h-96 sm:w-96 sm:blur-[140px]" />

                <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-cyan-400/10 blur-[100px] sm:h-96 sm:w-96 sm:blur-[140px]" />

                <div className="absolute left-10 top-24 hidden h-24 w-24 rotate-12 border border-cyan-500/10 lg:block" />

                <div className="absolute bottom-24 right-24 hidden h-16 w-16 rotate-45 border border-cyan-500/10 lg:block" />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                    {/* CONTENT - FIRST ON MOBILE */}
                    <div className="order-1">


                        <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                            Create Your{" "}
                            <span className="text-cyan-400">
                                Gamer Profile
                            </span>
                        </h2>

                        <p className="my-5 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
                            Build a professional gaming identity with avatars,
                            achievements, ranks and detailed gaming statistics.
                        </p>

                        {/* Timeline */}
                        <div className="relative pl-8">
                            {/* Vertical Line */}
                            <div className="absolute left-[11px] top-0 h-full w-px bg-gradient-to-b from-cyan-400 via-cyan-500/50 to-transparent" />

                            {features.map((item, index) => (
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

                        {/* CTA */}
                        <button
                        onClick={()=>{navigate("/profiles")}}

                            className="
                                group
                                mt-10
                                inline-flex
                                w-full
                                items-center
                                justify-center
                                gap-3
                                border
                                border-cyan-500/30
                                bg-cyan-500
                                px-6
                                py-3
                                font-semibold
                                text-black
                                transition-all
                                duration-300
                                hover:scale-[1.02]
                                sm:w-auto
                            "
                        >
                            View Profiles

                            <span className="transition-transform duration-300 group-hover:translate-x-1">
                                →
                            </span>
                        </button>
                    </div>

                    {/* CHARACTER - SECOND ON MOBILE */}
                    <div className="order-2 relative flex items-center justify-center lg:order-none">
                        {/* Glow */}
                        <div className="absolute h-[250px] w-[250px] rounded-full bg-cyan-500/20 blur-[80px] sm:h-[350px] sm:w-[350px] sm:blur-[100px] lg:h-[450px] lg:w-[450px] lg:blur-[120px]" />

                        {/* Ring */}
                        <div className="absolute h-[250px] w-[250px] rounded-full border border-cyan-500/10 sm:h-[350px] sm:w-[350px] lg:h-[420px] lg:w-[420px]" />

                         {/* Decorative Shape 1 */}
                        <div className="absolute left-0 top-10 h-20 w-20 rotate-12 border border-cyan-500/20 bg-cyan-500/15 backdrop-blur-md animate-rotate-slow" />

                        {/* Decorative Shape 2 */}
                        <div className="absolute bottom-16 right-0 h-14 w-14 rotate-45 border border-cyan-500/20 bg-cyan-500/20 backdrop-blur-md animate-float-rotate" />

                        {/* Decorative Shape 3 */}
                        <div className="absolute right-12 top-0 h-10 w-10 rotate-45  border border-cyan-400/30 bg-cyan-400/20 animate-diamond-spin" />

                        {/* Character */}
                        <img
                            src={gamerCharacter}
                            alt="Gamer Character"
                            className="
                                animate-character-float
                                relative
                                z-10
                                h-auto
                                w-full
                                max-w-[260px]
                                object-contain
                                drop-shadow-[0_0_40px_rgba(6,182,212,0.35)]
                                sm:max-w-[340px]
                                md:max-w-[420px]
                                lg:max-w-[500px]
                            "
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CreateProfilesSection;