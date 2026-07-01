const ClipCardSkeleton = () => {
    return (
        <div
            className="
                animate-pulse
                overflow-hidden
                border
                border-zinc-800
                bg-[#0b1120]
            "
        >
            {/* Top Accent */}
            <div className="h-1 bg-zinc-800" />

            {/* Thumbnail */}
            <div className="relative">

                <div className="aspect-video w-full bg-zinc-800" />

                {/* Role Badge */}
                <div className="absolute left-4 top-4 h-6 w-24 bg-zinc-700" />

            </div>

            {/* Content */}
            <div className="flex items-center gap-4 p-4">

                {/* Avatar */}
                <div className="h-12 w-12 shrink-0 rounded-full bg-zinc-800" />

                {/* Text */}
                <div className="flex-1">

                    <div className="h-4 w-4/5 bg-zinc-800" />

                    <div className="mt-3 h-3 w-2/5 bg-zinc-800" />

                </div>

            </div>

        </div>
    );
};

export default ClipCardSkeleton;