import { SearchX, Plus, Users } from "lucide-react";
import { Link } from "react-router-dom";

const NoPlayerRequest = () => {

    return (
        <section className="min-h-screen bg-[#050816] px-4 py-10 text-white">

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
                    <SearchX
                        size={52}
                        className="text-cyan-400"
                    />
                </div>

                {/* TITLE */}
                <h1 className="mt-8 text-3xl font-bold sm:text-4xl">
                    No Player Requests Available
                </h1>

                {/* DESCRIPTION */}
                <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-400 sm:text-base">
                    <span className="mt-4 max-w-md text-sm leading-relaxed text-zinc-400 sm:text-base">
                        No one has posted a player request yet.
                        Once players start looking for teammates,
                        requests will appear here. If you are looking
                        for players to join your squad, you can create
                        your own player request.
                    </span>
                </p>

                {/* BUTTON */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">

                    {/* PRIMARY */}
                    <Link
                        to="/create-request"
                        className="
                        flex items-center gap-2
                        bg-cyan-400
                        px-6 py-3
                        text-sm font-semibold
                        text-black
                        transition-all hover:bg-cyan-300"
                    >
                        <Plus size={18} />

                        Create Request
                    </Link>

                    {/* SECONDARY */}
                    <Link
                        to="/profiles"
                        className="
                        flex items-center gap-2
                        border border-zinc-700
                        bg-[#09111f] 
                        px-6 py-3 text-sm font-semibold
                        text-white transition-all hover:border-cyan-400"
                    >
                        <Users size={18} />
                        Explore Profiles
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default NoPlayerRequest;