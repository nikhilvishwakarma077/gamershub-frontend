const PlayerRequestCardSkeleton = () => {
    return (
        <div
            className="
                overflow-hidden
                border
                border-zinc-800
                bg-[#0b1120]
                animate-pulse
            "
        >
            {/* TOP ACCENT */}
            <div className="h-1 bg-cyan-500/30" />

            {/* HEADER */}
            <div className="border-b border-zinc-800 p-4">

                <div className="flex items-start justify-between">

                    <div className="flex items-center gap-3">

                        <div className="h-11 w-11 bg-zinc-800" />

                        <div>

                            <div className="h-5 w-28 bg-zinc-700" />

                            <div className="mt-2 h-3 w-20 bg-zinc-800" />

                        </div>

                    </div>

                    <div className="h-3 w-16 bg-zinc-800" />

                </div>

                {/* ROLE + TYPE */}
                <div className="mt-5 flex items-start justify-between">

                    <div>

                        <div className="h-3 w-20 bg-zinc-800" />

                        <div className="mt-2 h-7 w-36 bg-zinc-700" />

                    </div>

                    <div>

                        <div className="ml-auto h-3 w-14 bg-zinc-800" />

                        <div className="mt-2 h-7 w-24 bg-zinc-700" />

                    </div>

                </div>

            </div>

            {/* BODY */}
            <div className="space-y-3 p-4">

                {/* ACTIVE TIME */}
                <div className="border border-zinc-800 bg-[#09111f] p-3">

                    <div className="h-3 w-20 bg-zinc-800" />

                    <div className="mt-3 h-4 w-40 bg-zinc-700" />

                </div>

                {/* LANGUAGES */}
                <div className="border border-zinc-800 bg-[#09111f] p-3">

                    <div className="h-3 w-24 bg-zinc-800" />

                    <div className="mt-3 flex flex-wrap gap-2">

                        <div className="h-6 w-14 bg-zinc-700" />

                        <div className="h-6 w-20 bg-zinc-700" />

                        <div className="h-6 w-16 bg-zinc-700" />

                    </div>

                </div>

                {/* EXPIRY */}
                <div className="border border-zinc-800 bg-zinc-900/40 p-3">

                    <div className="h-4 w-32 bg-zinc-700" />

                </div>

            </div>

            {/* ACTIONS */}
            <div className="border-t border-zinc-800 p-4">

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

                    <div className="h-11 bg-zinc-700" />

                    <div className="h-11 bg-zinc-800" />

                    <div className="h-11 bg-zinc-700" />

                </div>

            </div>

        </div>
    );
};

export default PlayerRequestCardSkeleton;