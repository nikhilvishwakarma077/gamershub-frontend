const PlayerRequestCardSkeleton = () => {
    return (
        <div
            className="
                overflow-hidden rounded-2xl
                border border-cyan-950
                bg-zinc-900
                animate-pulse
            "
        >

            {/* TOP SECTION */}
            <div className="border-b border-cyan-950 p-5">

                <div className="flex items-start justify-between">

                    {/* USER */}
                    <div className="flex items-center gap-3">

                        <div
                            className="
                                h-12 w-12 rounded-full
                                bg-zinc-800"
                                />

                        <div>

                            <div className="h-5 w-32 rounded bg-zinc-700" />

                            <div className="mt-2 h-4 w-24 rounded bg-zinc-800" />
                        </div>
                    </div>

                    <div className="h-3 w-16 rounded bg-zinc-800" />
                </div>

                {/* ROLE + JOIN TYPE */}
                <div className="mt-5 flex items-center justify-between">

                    <div>

                        <div className="h-3 w-20 rounded bg-zinc-800" />

                        <div className="mt-2 h-6 w-28 rounded bg-zinc-700" />
                    </div>

                    <div>

                        <div className="h-3 w-24 rounded bg-zinc-800" />

                        <div className="mt-2 h-6 w-24 rounded bg-zinc-700" />
                    </div>
                </div>
            </div>

            {/* CONTENT */}
            <div className="space-y-4 p-5">

                {/* ACTIVE TIME */}
                <div
                    className="
                        rounded-xl border border-zinc-800
                        bg-zinc-950 p-4"
                >

                    <div className="h-3 w-20 rounded bg-zinc-800" />

                    <div className="mt-3 h-5 w-40 rounded bg-zinc-700" />
                </div>

                {/* LANGUAGES */}
                <div
                    className="
                        rounded-xl border border-zinc-800
                        bg-zinc-950 p-4"
                >

                    <div className="h-3 w-32 rounded bg-zinc-800" />

                    <div className="mt-4 flex flex-wrap gap-2">

                        <div className="h-7 w-16 rounded-md bg-zinc-700" />

                        <div className="h-7 w-20 rounded-md bg-zinc-700" />

                        <div className="h-7 w-14 rounded-md bg-zinc-700" />
                    </div>
                </div>

                {/* BUTTONS */}
                <div
                    className="
                        flex items-center justify-between gap-4
                        border-t border-zinc-800
                        pt-4"
                >

                    <div className="h-10 w-full rounded-lg bg-zinc-700" />

                    <div className="h-10 w-full rounded-lg bg-zinc-800" />
                </div>

                {/* FOOTER */}
                <div
                    className="
                        flex items-center justify-between
                        border-t border-zinc-800
                        pt-4"
                >

                    <div className="h-5 w-28 rounded bg-zinc-700" />

                    <div className="h-10 w-32 rounded-lg bg-zinc-700" />
                </div>
            </div>
        </div>
    );
};

export default PlayerRequestCardSkeleton;