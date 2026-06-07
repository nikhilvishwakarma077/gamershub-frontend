import { UsersRound, Search } from "lucide-react";
import { Link } from "react-router-dom";

const NoFindPlayer = () => {
  return (
    <section className="min-h-screen bg-[#050816] px-4 py-10 text-white">

      <div
        className="
          mx-auto flex min-h-[80vh] max-w-2xl
          flex-col items-center justify-center
          rounded-3xl
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
          <UsersRound
            size={52}
            className="text-cyan-400"
          />
        </div>

        {/* TITLE */}
        <h1 className="mt-8 text-3xl font-bold sm:text-4xl">
          No Players Found
        </h1>

        {/* DESCRIPTION */}
        <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-400 sm:text-base">
          No player requests are available right now.
          Check back later or create your own request
          to connect with players and build your squad.
        </p>

        {/* BUTTON */}
        <Link
          to="/create-request"
          className="
            mt-8 flex items-center gap-2
            rounded-2xl
            bg-cyan-400
            px-6 py-3
            text-sm font-semibold
            text-black
            transition-all hover:bg-cyan-300"
        >
          <Search size={18} />

          Create Player Request
        </Link>
      </div>
    </section>
  );
};

export default NoFindPlayer;