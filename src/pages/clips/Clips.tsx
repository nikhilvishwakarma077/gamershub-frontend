import { useEffect, useState } from "react";
import { getAllClips } from "../../services/clipService";
import type { Clip } from "../../types/clip.types";
import { toast } from "react-toastify";
import ClipCardSkeleton from "../../components/clips/skeletons/ClipCardSkeleton";
import { Link } from "react-router-dom";


const Clips = () => {

    const [clips, setClips] = useState<Clip[]>([])
    const [loading, setLoading] = useState(true);
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);


    const detectPlatform = (url: string): "youtube" | "instagram" | "unknown" => {
        if (url.includes("youtu.be") || url.includes("youtube.com")) return "youtube";
        if (url.includes("instagram.com") || url.includes("instagr.am")) return "instagram";
        return "unknown";
    };

    const getYouTubeThumbnail = (url: string): string => {
        const match = url.match(
            /(?:youtu\.be\/|youtube\.com.*(?:v=|\/shorts\/|\/embed\/))([^&?/]+)/
        );

        const videoId = match?.[1];
        if (!videoId) return "/images/default-clip.jpg";

        return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    };

    const getInstagramThumbnail = (): string => {
        return "https://images.macrumors.com/t/jkfoi-AlDh8DC2jET480Y5aS0ow=/1600x0/article-new/2021/03/Instagram-Feature-2.jpg";
    };


    const getClipThumbnail = (url: string): string => {
        const platform = detectPlatform(url);

        switch (platform) {
            case "youtube": return getYouTubeThumbnail(url);

            case "instagram": return getInstagramThumbnail();

            default: return "/thumbnails/thumbnail1.webp";
        }
    };

    const isYoutubeUrl = (url: string) => {
        return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//i.test(url);
    };


    const getYoutubeEmbedUrl = (url: string) => {
        if (!url) return "";

        // Shorts URL
        if (url.includes("/shorts/")) {
            const id = url.split("/shorts/")[1].split("?")[0];
            return `https://www.youtube.com/embed/${id}`;
        }

        // youtu.be URL
        if (url.includes("youtu.be/")) {
            const id = url.split("youtu.be/")[1].split("?")[0];
            return `https://www.youtube.com/embed/${id}`;
        }

        // watch?v=
        if (url.includes("watch?v=")) {
            const id = new URL(url).searchParams.get("v");
            return id
                ? `https://www.youtube.com/embed/${id}`
                : "";
        }

        // already embed URL
        if (url.includes("/embed/")) {
            return url;
        }

        return "";
    };

    const fetchClips = async () => {
        try {
            setLoading(true);

            const response = await getAllClips();

            const filteredClips = response.data.filter((clip: any) =>
                isYoutubeUrl(clip.clipUrl)
            );

            setClips(filteredClips);

        } catch (error: any) {
            toast.error(
                error?.response?.data?.message || "Failed to fetch clips."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClips()
    }, [])

    return (
        <section className="min-h-screen bg-[#050816] px-4 pt-20 pb-16 text-white">

            {/* FLOATING WORLD LAYER */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {/* GRID BG */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-size-[32px_32px] opacity-30" />

                {/* Glow Effects */}
                <div className="absolute left-0 top-20 h-100 w-100 rounded-full bg-cyan-500/10 blur-3xl" />
                <div className="absolute right-0 top-40 h-100 w-100 rounded-full bg-purple-500/10 blur-3xl " />

                {/* Moving Grid Glow Sweep */}
                <div className="absolute h-[200%] w-[200%] animate-sweep opacity-20 bg-[radial-gradient(circle,#22d3ee10_1px,transparent_1px)] bg-size-[40px_40px]" />

                {/* SHAPE 1 - DIAGONAL TRAVEL */}
                <div className="absolute h-16 w-16 border border-cyan-500/30 animate-path-1" />

                {/* SHAPE 2 - LEFT TO RIGHT LOOP */}
                <div className="absolute h-12 w-12 rotate-45 border border-cyan-400/30 animate-path-2" />

                {/* SHAPE 3 - BOUNCING ACROSS SCREEN */}
                <div className="absolute h-20 w-20 rounded-full border border-cyan-500/20 animate-path-3" />

                {/* SHAPE 4 - FAST SMALL PARTICLE */}
                <div className="absolute h-3 w-3 rounded-full bg-cyan-400/60 animate-path-4" />

                {/* SHAPE 5 - BIG ORBIT BOX */}
                <div className="absolute h-28 w-28 border border-purple-500/20 animate-path-5" />

            </div>

            <div className="mx-auto max-w-7xl ">



                {/* HERO HEADER */}
                <div className="mb-12  border border-zinc-800 bg-[#0b1120]/80 p-6 backdrop-blur-md sm:p-8 lg:p-10">

                    <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

                        <div className="max-w-3xl">

                            <div className="mb-4 inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-xs font-semibold tracking-[0.25em] text-cyan-300">
                                COMMUNITY
                            </div>

                            <h1 className="text-4xl font-black uppercase text-white tracking-tight sm:text-5xl lg:text-6xl">
                                Featured{" "}
                                <span className="bg-linear-to-r from-cyan-300 to-cyan-500 bg-clip-text text-transparent">
                                    Clips
                                </span>
                            </h1>

                            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
                                Watch the best clutches, tournament moments and insane gameplay uploaded by the GamerHub community.
                            </p>

                        </div>

                        {/* <div className="w-full lg:w-auto">

                            <select

                                className="w-full border border-zinc-700 bg-[#09111f] px-5 py-4 text-zinc-300 outline-none  transition-all  focus:border-cyan-500  lg:min-w-[320px]"
                            >
                                <option value="">
                                    All Roles
                                </option>

                                <option value="Primary Rusher">
                                    Primary Rusher
                                </option>

                                <option value="Secondary Rusher">
                                    Secondary Rusher
                                </option>

                                <option value="Nader">
                                    Nader
                                </option>

                                <option value="Sniper">
                                    Sniper
                                </option>

                                <option value="Primary Rusher + IGL">
                                    Primary Rusher + IGL
                                </option>

                                <option value="Secondary Rusher + IGL">
                                    Secondary Rusher + IGL
                                </option>

                                <option value="Nader + IGL">
                                    Nader + IGL
                                </option>

                                <option value="Sniper + IGL">
                                    Sniper + IGL
                                </option>
                            </select>

                        </div> */}

                    </div>

                </div>

                {/* CLIPS GRID */}
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">

                    {loading ? (

                        Array.from({ length: 6 }).map((_, index) => (
                            <ClipCardSkeleton key={index} />
                        ))

                    ) : clips.length < 1 ? (

                        <div
                            className="col-span-full flex min-h-80 flex-col items-center justify-center border border-zinc-800 bg-[#0b1120] p-8 text-center"
                        >
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png"
                                alt="No Clips"
                                onError={(e) => {
                                    e.currentTarget.src =
                                        "https://cdn-icons-png.flaticon.com/512/149/149071.png";
                                }}
                                className="mb-4 h-14 w-14 object-contain opacity-80"
                            />

                            <h2 className="text-2xl font-bold text-white">
                                No Clips Found
                            </h2>

                            <p className="mt-3 max-w-md text-zinc-400">
                                There are no gameplay clips available at the moment.
                                Check back later or upload your own highlights.
                            </p>
                        </div>

                    ) : (

                        clips.map((clip) => (

                            <div
                                key={clip.clipId}
                                className="group relative flex h-full flex-col overflow-hidden border border-zinc-800 bg-[#0b1120] transition-all duration-300 hover:border-cyan-500/40 hover:shadow-[0_0_35px_rgba(6,182,212,0.12)]"
                            >
                                {/* Top Accent */}
                                <div className="h-1 bg-linear-to-r from-transparent via-cyan-400 to-transparent" />


                                {/* Thumbnail */}
                                <div

                                    onClick={() => {
                                        if (isYoutubeUrl(clip.clipUrl)) {
                                            setSelectedVideo(getYoutubeEmbedUrl(clip.clipUrl));
                                        } else {
                                            window.open(clip.clipUrl, "_blank");
                                        }
                                    }}
                                    className="relative overflow-hidden">

                                    <img
                                        src={getClipThumbnail(clip.clipUrl)}
                                        onError={(e) => {
                                            e.currentTarget.src =
                                                "https://mrwallpaper.com/images/hd/simple-youtube-background-logo-l7h6sa9w804yduwn.jpg";
                                        }}
                                        className="aspect-video w-full object-cover transition duration-300 group-hover:scale-105"
                                        alt={clip.title}
                                    />

                                    <div className="absolute left-4 top-4 border border-cyan-500/40 bg-black/70 px-2 py-1 text-xs font-semibold text-cyan-300 backdrop-blur">
                                        {clip.role}
                                    </div>

                                </div>

                                {/* CONTENT */}
                                <div className="flex items-center gap-4 p-4">

                                    <Link
                                        to={`/profile/${clip.profileId}`}
                                        className="relative flex h-12 w-12 shrink-0 items-center justify-center">

                                        <img
                                            src={`/avatars/${clip.avatar}`}
                                            alt={clip.username}
                                            className="relative h-12 w-12 rounded-full border border-cyan-500/90 object-cover"
                                        />

                                    </Link>

                                    <div className="min-w-0 flex-1">

                                        <h2 className="line-clamp-2 text-sm font-semibold leading-5 text-white sm:text-base">
                                            {clip.title}
                                        </h2>

                                        <Link
                                            to={`/profile/${clip.profileId}`}
                                            className="mt-1  hover:underline truncate text-xs text-zinc-400 sm:text-sm">
                                            {clip.username}
                                        </Link>

                                    </div>

                                </div>

                            </div>

                        ))

                    )}

                </div>

            </div>

            {/* YT VIDEO PREVIEW */}
            {selectedVideo && (

                <div
                    className="fixed inset-0 z-9999 flex items-center justify-center bg-black/90 p-4"
                    onClick={() => setSelectedVideo(null)}
                >

                    <div
                        className="relative w-full max-w-5xl"
                        onClick={(e) => e.stopPropagation()}
                    >

                        <button
                            onClick={() =>
                                setSelectedVideo(null)
                            }
                            className="absolute -top-12 right-0 text-4xl  text-white cursor-pointer"
                        >
                            ×
                        </button>

                        <div className="aspect-video w-full border border-cyan-500/30 bg-black">

                            <iframe
                                src={selectedVideo}
                                className="h-full w-full"
                                allow="
                                accelerometer;
                                autoplay;
                                clipboard-write;
                                encrypted-media;
                                gyroscope;
                                picture-in-picture;
                                web-share"

                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            />

                        </div>

                    </div>

                </div>

            )}

        </section>
    );
};

export default Clips;