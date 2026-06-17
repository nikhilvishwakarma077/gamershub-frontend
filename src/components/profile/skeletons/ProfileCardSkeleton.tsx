const ProfileCardSkeleton = () => {
    return (
        <div
            className="group animate-pulse overflow-hidden border border-zinc-800 bg-[#0b1120]"
        >
            {/* TOP ACCENT */}
            <div className="h-1 bg-zinc-800" />

            {/* HEADER */}
            <div className="border-b border-zinc-800 p-4">

                <div className="flex items-center justify-between">

                    <div className="h-7 w-20 bg-zinc-800" />

                    <div className="h-4 w-16 bg-zinc-800" />

                </div>

            </div>

            {/* AVATAR */}
            <div className="flex flex-col items-center  px-6 pt-6 text-center">

                <div className="h-24 w-24 bg-zinc-800 rounded-full" />

                <div className="mt-5 h-6 w-36 bg-zinc-700" />

                <div className="mt-3 h-9 w-40 border border-zinc-800 bg-[#09111f]" />

            </div>

            {/* INFO */}
            <div className="space-y-3 p-5">

                {/* COUNTRY */}
                <div className="border border-zinc-800 bg-[#09111f] p-3">

                    <div className="flex items-center gap-3">

                        <div className="h-5 w-5 bg-zinc-700" />

                        <div className="flex-1">

                            <div className="h-3 w-16 bg-zinc-800" />

                            <div className="mt-2 h-4 w-24 bg-zinc-700" />

                        </div>

                    </div>

                </div>

                {/* EXPERIENCE */}
                <div className="border border-zinc-800 bg-[#09111f] p-3">

                    <div className="h-3 w-28 bg-zinc-800" />

                    <div className="mt-3 h-6 w-20 bg-zinc-700" />

                </div>

                {/* STATUS */}
                <div className="border border-zinc-800 bg-[#09111f] p-3">

                    <div className="mx-auto h-5 w-32 bg-zinc-700" />

                </div>

            </div>

            {/* CTA */}
            <div className="p-5 pt-0">

                <div
                    className="flex h-12 items-center justify-center border border-zinc-800 bg-[#09111f]"
                >

                    <div className="h-5 w-32 bg-zinc-700" />

                </div>

            </div>

        </div>
    );
};

export default ProfileCardSkeleton;