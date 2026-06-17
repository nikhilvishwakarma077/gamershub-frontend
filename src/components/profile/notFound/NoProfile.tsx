import { UserCircle2, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const NoProfile = () => {

    return (
        <section className="min-h-screen bg-[#050816] px-4 py-20 text-white">

            <div
                className="
                    mx-auto flex min-h-[80vh] max-w-2xl
                    flex-col items-center justify-center
                    border border-cyan-400/10
                    bg-[#0b1120]
                    p-8 text-center"
            >

                {/* ICON */}
                <div
                    className="
                        flex h-24 w-24 items-center justify-center
                        rounded-full
                        border border-cyan-400/10
                        bg-[#09111f]"
                >
                    <UserCircle2
                        size={52}
                        className="text-cyan-400"
                    />
                </div>

                {/* TITLE */}
                <h1 className="mt-8 text-3xl font-bold sm:text-4xl">
                    Profile Not Found
                </h1>

                {/* DESCRIPTION */}
                <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-400 sm:text-base">
                    You have not created your gamer profile yet.
                    Create your profile to showcase your skills,
                    stats, achievements, and connect with players.
                </p>

                {/* BUTTON */}
                <Link
                    to="/create-profile"
                    className="
                        mt-8 flex items-center gap-2
                        bg-cyan-400
                        px-6 py-3
                        text-sm font-semibold
                        text-black
                        transition-all hover:bg-cyan-300
                    "
                >
                    <Plus size={18} />

                    Create Profile
                </Link>
            </div>
        </section>
    );
};

export default NoProfile;