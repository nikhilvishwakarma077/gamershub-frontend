const ProfileCardSkeleton = () => {
    return (
        <div
            className="
                w-full max-w-sm animate-pulse rounded-xl
                border border-zinc-800
                bg-[#4b3d6680]
                p-5
            "
        >

            {/* LEVEL */}
            <div className="mb-5 flex justify-between">

                <div className="h-8 w-24 rounded-md bg-zinc-700" />

                <div className="h-8 w-24 rounded-md bg-zinc-800" />
            </div>

            {/* AVATAR */}
            <div className="flex flex-col items-center text-center">

                <div
                    className="
                        h-24 w-24 rounded-full
                        bg-zinc-700
                    "
                />

                <div className="mt-4 h-7 w-40 rounded bg-zinc-700" />

                <div className="mt-3 flex items-center gap-2">

                    <div className="h-4 w-4 rounded-full bg-zinc-700" />

                    <div className="h-4 w-24 rounded bg-zinc-700" />
                </div>
            </div>

            {/* INFO */}
            <div className="mt-6 space-y-3">

                {/* COUNTRY */}
                <div
                    className="
                        flex items-center gap-3
                        rounded-lg border border-zinc-800
                        bg-[#09111f]
                        px-4 py-3
                    "
                >

                    <div className="h-5 w-5 rounded-full bg-zinc-700" />

                    <div className="flex-1">

                        <div className="h-3 w-16 rounded bg-zinc-800" />

                        <div className="mt-2 h-4 w-24 rounded bg-zinc-700" />
                    </div>
                </div>

                {/* ESP EXPERIENCE */}
                <div
                    className="
                        rounded-lg border border-zinc-800
                        bg-[#09111f]
                        px-4 py-3
                    "
                >

                    <div className="h-3 w-28 rounded bg-zinc-800" />

                    <div className="mt-3 h-6 w-20 rounded bg-zinc-700" />
                </div>

                {/* STATUS */}
                <div
                    className="
                        rounded-lg
                        bg-zinc-700
                        px-4 py-3
                    "
                >
                    <div className="mx-auto h-5 w-36 rounded bg-zinc-600" />
                </div>
            </div>

            {/* BUTTON */}
            <div
                className="
                    mt-5 flex items-center justify-center gap-2
                    rounded-lg border border-zinc-700
                    bg-[#09111f]
                    px-4 py-3
                "
            >

                <div className="h-5 w-5 rounded-full bg-zinc-700" />

                <div className="h-5 w-28 rounded bg-zinc-700" />
            </div>
        </div>
    );
};

export default ProfileCardSkeleton;