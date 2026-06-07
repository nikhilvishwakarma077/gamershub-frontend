const MyProfileSkeleton = () => {
    return (
        <div className="min-h-screen animate-pulse bg-[#050816] text-white">

            {/* BANNER */}
            <div className="h-52 w-full bg-zinc-800 md:h-72" />

            <div className="mx-auto max-w-7xl px-4 pb-10">

                {/* PROFILE CARD */}
                <div
                    className="
                        mt-6 flex flex-col gap-6
                        rounded-xl border border-zinc-800
                        bg-[#0b1120] p-5
                        md:flex-row md:items-center md:justify-between
                    "
                >

                    {/* LEFT */}
                    <div className="flex flex-col gap-4 md:flex-row md:items-center">

                        {/* AVATAR */}
                        <div
                            className="
                                h-38 w-38 rounded-xl
                                bg-zinc-800
                            "
                        />

                        <div>

                            <div className="h-8 w-52 rounded bg-zinc-700" />

                            <div className="mt-3 h-4 w-28 rounded bg-zinc-800" />

                            <div className="mt-5 space-y-2">

                                <div className="h-4 w-125 max-w-full rounded bg-zinc-800" />

                                <div className="h-4 w-105 max-w-full rounded bg-zinc-800" />
                            </div>

                            {/* TAGS */}
                            <div className="mt-5 flex flex-wrap gap-3">

                                {
                                    Array.from({ length: 4 }).map((_, index) => (
                                        <div
                                            key={index}
                                            className="
                                                h-10 w-32 rounded-lg
                                                border border-zinc-700
                                                bg-zinc-800
                                            "
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="space-y-3">

                        <div className="h-12 w-44 rounded-lg bg-zinc-700" />

                        <div className="h-10 w-36 rounded-lg bg-zinc-800" />
                    </div>
                </div>

                {/* 3 CARDS GRID */}
                <div className="mt-6 grid gap-6 lg:grid-cols-3">

                    {
                        Array.from({ length: 3 }).map((_, index) => (
                            <div
                                key={index}
                                className="
                                    rounded-xl border border-zinc-800
                                    bg-[#0b1120] p-5
                                "
                            >

                                {/* TITLE */}
                                <div className="mb-5 flex items-center gap-3">

                                    <div className="h-5 w-5 rounded-full bg-zinc-700" />

                                    <div className="h-6 w-36 rounded bg-zinc-700" />
                                </div>

                                {/* ITEMS */}
                                <div className="space-y-3">

                                    {
                                        Array.from({ length: 3 }).map((_, i) => (
                                            <div
                                                key={i}
                                                className="
                                                    rounded-lg border border-zinc-800
                                                    bg-[#09111f] p-4
                                                "
                                            >

                                                <div className="h-4 w-24 rounded bg-zinc-800" />

                                                <div className="mt-3 h-6 w-32 rounded bg-zinc-700" />
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>

                {/* CLIPS */}
                <div
                    className="
                        mt-8 rounded-xl border border-zinc-800
                        bg-[#0b1120] p-6
                    "
                >

                    <div className="mb-5 flex items-center gap-3">

                        <div className="h-5 w-5 rounded-full bg-zinc-700" />

                        <div className="h-6 w-40 rounded bg-zinc-700" />
                    </div>

                    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                        {
                            Array.from({ length: 3 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="
                                        overflow-hidden rounded-lg
                                        border border-zinc-800
                                        bg-[#09111f]
                                    "
                                >

                                    <div className="h-48 w-full bg-zinc-800" />

                                    <div className="p-3">

                                        <div className="h-4 w-40 rounded bg-zinc-700" />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>

                {/* ACHIEVEMENTS */}
                <div
                    className="
                        mt-8 rounded-xl border border-zinc-800
                        bg-[#0b1120] p-6
                    "
                >

                    <div className="mb-5 flex items-center gap-3">

                        <div className="h-5 w-5 rounded-full bg-zinc-700" />

                        <div className="h-6 w-44 rounded bg-zinc-700" />
                    </div>

                    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                        {
                            Array.from({ length: 3 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="
                                        overflow-hidden rounded-lg
                                        border border-zinc-800
                                        bg-[#09111f]
                                    "
                                >

                                    <div className="h-48 w-full bg-zinc-800" />

                                    <div className="p-3">

                                        <div className="h-4 w-40 rounded bg-zinc-700" />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfileSkeleton;