import { useNavigate } from "react-router-dom";
import trophy from "../../assets/achieve.webp"

const ConnectWithGamers = () => {
    const features = [
        "Connect with players",
        "Build teams",
        "Achieve Success",
        "Player discovery",
    ];

    const navigate = useNavigate()

    return (
        <section className="relative overflow-hidden bg-black py-20">
            {/* Decorative Background */}
            <div className="absolute inset-0">
                <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
                <div className="absolute -right-24 bottom-20 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

                <div className="absolute left-10 top-10 h-24 w-24 rotate-12 border border-cyan-500/20" />
                <div className="absolute bottom-16 right-20 h-16 w-16 rotate-45 border border-cyan-400/30 animate-pulse-glow" />

                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(6,182,212,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.04)_1px,transparent_1px)] bg-size-[60px_60px]" />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid items-center gap-16 lg:grid-cols-2">
                    {/* Content */}
                    <div>

                        <h2 className="mt-6 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
                            Connect With
                            <span className="block text-cyan-400">The Community</span>
                        </h2>

                        <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
                            Discover players, build teams, explore profiles and grow your
                            gaming network. Find like-minded gamers and create connections
                            that help you compete at the highest level.
                        </p>

                        {/* Features */}
                        <div className="mt-10 grid gap-4 sm:grid-cols-2">
                            {features.map((feature) => (
                                <div
                                    key={feature}
                                    className="group flex items-center gap-4 rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4 transition-all duration-300 hover:border-cyan-500/50 hover:bg-zinc-900"
                                >
                                    {/* Custom Icon */}
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10">
                                        <div className="h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee]" />
                                    </div>

                                    <span className="font-medium text-zinc-200">
                                        {feature}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* CTA */}
                        <button
                         onClick={()=>{navigate("/profiles")}}
                        className="mt-10 inline-flex items-center gap-3 bg-cyan-500 px-8 py-4 font-bold text-black transition-all duration-300 hover:scale-105 hover:bg-cyan-400">
                            Find Players

                            <span className="flex h-5 w-5 items-center justify-center">
                                →
                            </span>
                        </button>
                    </div>

                  
                    {/* Illustration */}
                    <div className="relative">
                        {/* Cyan Glow */}
                        <div className="absolute left-1/2 top-1/2 h-180 w-200 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/20 blur-3xl" />

                        {/* Trophy Image Container */}
                        <div className="relative flex items-center justify-center">
                            <img
                                src={trophy} // replace with your image path
                                alt="Gaming Trophy"
                                className="relative rounded-[50%] z-10 w-full max-w-md object-contain drop-shadow-[0_0_40px_rgba(34,211,238,0.35)] sm:max-w-lg lg:max-w-xl"
                            />
                        </div>

                        {/* Decorative Shape 1 */}
                        <div className="absolute left-0 top-10 h-20 w-20 rotate-12 border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-md  animate-diamond-spin" />

                        {/* Decorative Shape 2 */}
                        <div className="absolute bottom-16 right-0 h-14 w-14 rotate-45 border border-cyan-500/20 bg-cyan-500/10 backdrop-blur-md animate-diamond-spin" />

                        {/* Decorative Shape 3 */}
                        <div className="absolute right-12 top-0 h-10 w-10 rounded-full border border-cyan-400/30 bg-cyan-400/10 animate-pulse-glow" />

                      
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ConnectWithGamers;