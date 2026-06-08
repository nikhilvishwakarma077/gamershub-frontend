import { Mail, Gamepad2 } from "lucide-react";

const Footer = () => {
    return (
        <footer className="relative overflow-hidden border-t border-cyan-400/10 bg-[#050816] text-white">
            {/* Glow Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,255,0.08),transparent_55%)]" />

            <div className="relative z-10 mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-10">
                <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                    
                    {/* Left */}
                    <div className="text-center md:text-left">
                        <div className="flex items-center justify-center gap-3 md:justify-start">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-500/10">
                                <Gamepad2 className="h-5 w-5 text-cyan-400" />
                            </div>

                            <div>
                                <h2 className="text-xl font-black tracking-wide text-cyan-300">
                                    GamersHub
                                </h2>

                             
                            </div>
                        </div>
                    </div>

                    {/* Right */}
                    <div
                        className="
                            flex items-center gap-3
                            border border-cyan-400/20
                            bg-white/5
                            px-5 py-3
                            backdrop-blur-xl

                            [clip-path:polygon(0_0,95%_0,100%_50%,95%_100%,0_100%,0%_50%)]
                        "
                    >
                        <Mail className="h-5 w-5 text-cyan-400" />

                        <a
                            href="https://mail.google.com"
                            target="_blank"
                            className="text-sm text-zinc-300 transition hover:text-cyan-300"
                        >
                            nikhilvishwakarma7707@gmail.com
                        </a>
                    </div>
                </div>

                {/* Bottom Line */}
                <div className="mt-8 border-t border-cyan-400/10 pt-5 text-center text-xs tracking-wide text-zinc-500">
                    © 2026 GamersHub. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;