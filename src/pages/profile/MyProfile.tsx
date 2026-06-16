import { Trophy, Shield, Users, Video, Clock3 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { myProfile } from "../../services/profileService";
import { useProfileStore } from "../../store/profileStore";
import NoProfile from "../../components/profile/notFound/NoProfile";
import MyProfileSkeleton from "../../components/profile/skeletons/MyProfileSkeleton";
import type { MyProfileType } from "../../types/profile.types";
import { toast } from "react-toastify";




const MyProfile = () => {

    const navigate = useNavigate();

    const setProfile = useProfileStore((state) => state.setProfile);
    const [myProfileData, setMyProfileData] = useState<MyProfileType | null>(null);
    const [showAvatarPreview, setShowAvatarPreview] = useState(false);
    const [selectedAchievement, setSelectedAchievement] = useState<{
        image: string;
        title: string;
    } | null>(null);
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);


    const [loading, setLoading] = useState(false);


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
        return (
            url.includes("youtube.com") ||
            url.includes("youtu.be")
        );
    };

    const getYoutubeEmbedUrl = (url: string) => {

        const match = url.match(
            /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^?&/]+)/
        );

        return match
            ? `https://www.youtube.com/embed/${match[1]}`
            : "";
    };

    const fetchProfile = useCallback(async () => {
        try {
            setLoading(true);

            const res = await myProfile();

            setProfile(res.profile);
            setMyProfileData(res.profile);

        } catch (error: any) {
            console.error(error);

            setMyProfileData(null);

            toast.error(error?.response?.data?.message || "Failed to load profile");
        } finally {
            setLoading(false);
        }
    }, [setProfile]);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    if (loading) {
        return <MyProfileSkeleton />;
    }

    if (!myProfileData) {
        return <NoProfile />;
    }
    return (
        <div className="min-h-screen py-20 bg-[#050816] text-white">

            {/* BANNER */}
            <div className="relative aspect-4/1 min-h-35 max-h-80 w-full overflow-hidden rounded-b-2xl"
            >
                <img
                    src={`/banners/${myProfileData.banner}`}
                    alt="banner"
                    className=" absolute inset-0 h-full w-full object-cover object-center"
                />
            </div>

            <div className="mx-auto max-w-7xl px-4 pb-10">

                {/* PROFILE CARD */}
                <div className="mt-6 border border-zinc-800 bg-[#0b1120] p-5 sm:p-6 lg:p-8">

                    <div className="flex flex-col gap-8 lg:flex-row lg:items-center">

                        {/* AVATAR */}
                        <div className="flex justify-center lg:justify-start">

                            <div
                                className="relative cursor-pointer group"
                                onClick={() => setShowAvatarPreview(true)}
                            >

                                <div className="absolute inset-0 bg-cyan-500/20 blur-3xl" />

                                <img
                                    src={`/avatars/${myProfileData.avatar}`}
                                    alt="avatar"
                                    onError={(e) => {
                                        e.currentTarget.src =
                                            "https://cdn-icons-png.flaticon.com/512/149/149071.png";
                                    }}
                                    className="relative rounded-full h-28 w-28 sm:h-36 sm:w-36 lg:h-60 lg:w-60 border-2 border-cyan-500/40 object-cover transition-all duration-300 group-hover:scale-105"
                                />

                                {/* View Overlay */}
                                <div
                                    className="absolute inset-0 scale-105  flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-all duration-300 group-hover:opacity-100"
                                >
                                    <span className="text-xs font-semibold tracking-wider text-white">
                                        VIEW
                                    </span>
                                </div>

                            </div>

                        </div>

                        {/* CONTENT */}
                        <div className="flex-1">

                            {/* DESKTOP TOP ROW */}
                            <div className="hidden lg:flex items-start justify-between gap-6">

                                {/* LEFT */}
                                <div>

                                    <h1 className="text-4xl font-black tracking-wide text-white">
                                        {myProfileData?.username}
                                    </h1>

                                    <p className="mt-1 text-sm text-zinc-500">
                                        UID #{myProfileData?.uid}
                                    </p>

                                </div>
                                {/* RIGHT */}
                                <div className="flex w-55 flex-col items-stretch gap-3">

                                    {/* STATUS */}
                                    <div className={` border px-5 py-3 text-center font-medium capitalize
                                    ${myProfileData.availability.status === "open for scrims"
                                            ? "border-orange-400 bg-orange-400/10 text-orange-300"
                                            : myProfileData.availability.status === "looking for team"
                                                ? "border-green-400 bg-green-400/10 text-green-300"
                                                : myProfileData.availability.status === "already in team"
                                                    ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                                                    : "border-zinc-700 text-zinc-300"
                                        } `}
                                    >
                                        {myProfileData?.availability.status}
                                    </div>

                                    {/* EDIT BUTTON */}
                                    <button
                                        onClick={() => navigate(`/edit-profile/${myProfileData?._id}`)}
                                        className="w-full border border-cyan-500 bg-cyan-500 px-5 py-3 text-center text-sm font-semibold uppercase tracking-wider text-black transition-all duration-300 hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] cursor-pointer"
                                    >
                                        Edit Profile
                                    </button>

                                </div>

                            </div>

                            {/* MOBILE HEADER */}
                            <div className="lg:hidden  text-center">

                                <h1 className="text-3xl font-black tracking-wide text-white">
                                    {myProfileData?.username}
                                </h1>

                                <p className="mt-1 text-sm text-zinc-500">
                                    UID #{myProfileData?.uid}
                                </p>

                            </div>

                            <div className="flex justify-center lg:justify-start">

                                <div className="flex items-center border border-cyan-500/30 bg-[#09111f]">

                                    <div className="bg-cyan-500 px-3 py-3 text-xs font-black text-black">
                                        ROLE
                                    </div>

                                    <div className="px-4 py-3 text-sm font-bold uppercase tracking-wider text-white">
                                        {myProfileData?.role}
                                    </div>

                                </div>

                            </div>

                            {/* TAGS */}
                            <div className="mt-5 flex flex-wrap justify-center gap-3 lg:justify-start">

                                <div className="border border-zinc-700 bg-[#09111f] px-4 py-2 text-sm text-zinc-300">
                                    Age -  {myProfileData?.age}
                                </div>

                                <div className="border border-zinc-700 bg-[#09111f] px-4 py-2 text-sm text-zinc-300">
                                    {myProfileData?.country}
                                </div>


                                <div className="flex flex-wrap gap-2">
                                    {myProfileData?.languages?.map((language, index) => (
                                        <div
                                            key={index}
                                            className="border border-cyan-500/20 bg-cyan-500/10 px-3 py-2 text-sm text-cyan-300"
                                        >
                                            {language}
                                        </div>
                                    ))}

                                </div>

                            </div>

                            {/* BIO */}
                            <div className="mt-5">

                                <p className="text-center text-sm leading-relaxed text-zinc-300 lg:text-left"
                                >
                                    {myProfileData?.bio}
                                </p>

                            </div>

                            {/* MOBILE ONLY STATUS + SOCIALS */}
                            <div className="mt-6 lg:hidden">

                                {/* STATUS */}
                                <div
                                    className={`w-full border px-5 py-3 text-center font-medium capitalize
                                     ${myProfileData.availability.status === "open for scrims"
                                            ? "border-orange-400 bg-orange-400/10 text-orange-300"
                                            : myProfileData.availability.status === "looking for team"
                                                ? "border-green-400 bg-green-400/10 text-green-300"
                                                : myProfileData.availability.status === "already in team"
                                                    ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                                                    : "border-zinc-700 text-zinc-300"
                                        }`}
                                >
                                    {myProfileData?.availability.status}
                                </div>

                                {/* EDIT BUTTON */}
                                <button
                                    onClick={() => navigate(`/edit-profile/${myProfileData?._id}`)}
                                    className="mt-3 w-full border border-cyan-500 bg-cyan-500 px-5 py-3 text-center text-black text-sm font-semibold uppercase tracking-wider transition-all duration-300 hover:bg-cyan-500 hover:text-black cursor-pointer"
                                >
                                    Edit Profile
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

                {/* 3 CARDS GRID */}
                <div className="mt-6 grid gap-6 lg:grid-cols-3">

                    {/* STATS */}
                    <div className="border border-zinc-800 bg-[#0b1120]">

                        <div className="h-1 bg-linear-to-r from-transparent via-cyan-400 to-transparent" />

                        <div className="p-5">

                            <div className="mb-4 flex items-center gap-2">

                                <Shield
                                    className="text-cyan-400"
                                    size={16}
                                />

                                <h2 className="text-lg font-semibold text-white">
                                    Player Stats
                                </h2>

                            </div>

                            {myProfileData?.stats?.currentRank ||
                                myProfileData?.stats?.kdRatio ||
                                myProfileData?.stats?.headshotPercentage ? (

                                <div className="space-y-3">

                                    <div className="border border-zinc-800 bg-[#09111f] p-4">

                                        <p className="text-xs uppercase tracking-wider text-zinc-500">
                                            BR Rank
                                        </p>

                                        <h3 className="mt-1 text-xl font-bold text-cyan-400">
                                            {myProfileData?.stats?.currentRank || "N/A"}
                                        </h3>

                                    </div>

                                    <div className="border border-zinc-800 bg-[#09111f] p-4">

                                        <p className="text-xs uppercase tracking-wider text-zinc-500">
                                            KD Ratio
                                        </p>

                                        <h3 className="mt-1 text-lg font-semibold text-white">
                                            {myProfileData?.stats?.kdRatio || "N/A"}
                                        </h3>

                                    </div>

                                    <div className="border border-zinc-800 bg-[#09111f] p-4">

                                        <p className="text-xs uppercase tracking-wider text-zinc-500">
                                            Headshot %
                                        </p>

                                        <h3 className="mt-1 text-lg font-semibold text-white">
                                            {myProfileData?.stats?.headshotPercentage
                                                ? `${myProfileData.stats.headshotPercentage}%`
                                                : "N/A"}
                                        </h3>

                                    </div>

                                </div>

                            ) : (

                                <div className="flex h-52 flex-col items-center justify-center border border-dashed border-zinc-700 bg-[#09111f] text-center">

                                    <Shield
                                        size={36}
                                        className="mb-3 text-zinc-600"
                                    />

                                    <h3 className="text-base font-semibold text-zinc-300">
                                        No Stats Available
                                    </h3>

                                    <p className="mt-1 text-sm text-zinc-500">
                                        You have not added stats yet.
                                    </p>

                                </div>

                            )}

                        </div>

                    </div>

                    {/* EXPERIENCE */}
                    <div className="border border-zinc-800 bg-[#0b1120]">

                        <div className="h-1 bg-linear-to-r from-transparent via-cyan-400 to-transparent" />

                        <div className="p-5">

                            <div className="mb-4 flex items-center gap-2">

                                <Shield
                                    className="text-cyan-400"
                                    size={16}
                                />

                                <h2 className="text-lg font-semibold text-white">
                                    Experience
                                </h2>

                            </div>

                            <div className="space-y-3">

                                <div className="border border-zinc-800 bg-[#09111f] p-4">

                                    <p className="text-xs uppercase tracking-wider text-zinc-500">
                                        ID Level
                                    </p>

                                    <h3 className="mt-1 text-xl font-bold text-cyan-400">
                                        Lv. {myProfileData?.experience?.level}
                                    </h3>

                                </div>

                                <div className="border border-zinc-800 bg-[#09111f] p-4">

                                    <p className="text-xs uppercase tracking-wider text-zinc-500">
                                        Years Playing
                                    </p>

                                    <h3 className="mt-1 text-lg font-semibold text-white">
                                        {myProfileData?.experience?.yearsPlaying} Years
                                    </h3>

                                </div>

                                <div className="border border-zinc-800 bg-[#09111f] p-4">

                                    <p className="text-xs uppercase tracking-wider text-zinc-500">
                                        Esports Experience
                                    </p>

                                    <h3 className="mt-1 text-lg font-semibold text-white">
                                        {myProfileData?.experience?.esportsExperience} Years
                                    </h3>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* PREVIOUS TEAM */}
                    <div className="border border-zinc-800 bg-[#0b1120]">

                        <div className="h-1 bg-linear-to-r from-transparent via-cyan-400 to-transparent" />

                        <div className="p-5">

                            <div className="mb-4 flex items-center gap-2">

                                <Users
                                    className="text-cyan-400"
                                    size={16}
                                />

                                <h2 className="text-lg font-semibold text-white">
                                    Previous Teams
                                </h2>

                            </div>

                            {myProfileData?.teamHistory[0].teamName == "" ||
                                myProfileData?.teamHistory[0].teamName == undefined ? (

                                <div className="flex h-52 flex-col items-center justify-center border border-dashed border-zinc-700 bg-[#09111f] text-center">

                                    <Users
                                        size={36}
                                        className="mb-3 text-zinc-600"
                                    />

                                    <h3 className="text-base font-semibold text-zinc-300">
                                        No Team History
                                    </h3>

                                    <p className="mt-1 text-sm text-zinc-500">
                                        You have not added any previous teams.
                                    </p>

                                </div>

                            ) : (

                                <div className="max-h-105 space-y-3 overflow-y-auto pr-1">

                                    {myProfileData.teamHistory.map((team, index) => (

                                        <div
                                            key={index}
                                            className="border border-zinc-800 bg-[#09111f] p-4 transition-all duration-300 hover:border-cyan-500/30"
                                        >

                                            <h3 className="wrap-break-word text-sm font-semibold text-white">
                                                {team.teamName}
                                            </h3>

                                            <p className="mt-1 text-sm text-cyan-300">
                                                {team.role}
                                            </p>

                                            <div className="mt-3 flex items-center gap-2 text-xs text-zinc-500">

                                                <Clock3 size={13} />

                                                <span>{team.duration}</span>

                                            </div>

                                        </div>

                                    ))}

                                </div>

                            )}

                        </div>

                    </div>

                </div>

                {/* CLIPS */}
                <div className="mt-8 border border-zinc-800 bg-[#0b1120]">

                    <div className="h-1 bg-linear-to-r from-transparent via-cyan-400 to-transparent" />

                    <div className="p-4 sm:p-5">

                        <div className="mb-5 flex items-center gap-2">

                            <Video
                                className="text-cyan-400"
                                size={18}
                            />

                            <h2 className="text-lg font-semibold text-white">
                                Featured Clips
                            </h2>

                        </div>

                        {myProfileData?.clips[0].title == "" ||
                            myProfileData?.clips[0].title == undefined ? (

                            <div className="flex h-52 flex-col items-center justify-center border border-dashed border-zinc-700 bg-[#09111f] text-center">

                                <Video
                                    size={36}
                                    className="mb-3 text-zinc-600"
                                />

                                <h3 className="text-base font-semibold text-zinc-300">
                                    No Clips Added
                                </h3>

                                <p className="mt-1 text-sm text-zinc-500">
                                    You have not uploaded any clips yet.
                                </p>

                            </div>

                        ) : (

                            <>
                                {/* MOBILE SCROLL */}
                                <div className="flex gap-4 overflow-x-auto pb-2 md:hidden">

                                    {myProfileData.clips.map((clip, index) => (

                                        <div
                                            key={index}
                                            className=" min-w-70 max-w-70 shrink-0 border border-zinc-800 bg-[#09111f]"
                                        >

                                            <div
                                                onClick={() => {

                                                    if (isYoutubeUrl(clip.clipUrl)) {
                                                        setSelectedVideo(
                                                            getYoutubeEmbedUrl(clip.clipUrl)
                                                        );
                                                    } else {
                                                        window.open(
                                                            clip.clipUrl,
                                                            "_blank"
                                                        );
                                                    }

                                                }}
                                                className="group cursor-pointer overflow-hidden"
                                            >

                                                <img
                                                    src={getClipThumbnail(clip.clipUrl)}
                                                    alt={clip.title}
                                                    className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"

                                                    onError={(e) => {
                                                        e.currentTarget.src =
                                                            "/thumbnails/thumbnail1.webp";
                                                    }}
                                                />

                                            </div>

                                            <div className="border-t border-zinc-800 p-3">

                                                <h3 className="line-clamp-2 text-sm font-medium text-white">
                                                    {clip.title}
                                                </h3>

                                            </div>

                                        </div>

                                    ))}

                                </div>

                                {/* DESKTOP GRID */}
                                <div className="hidden gap-5 md:grid md:grid-cols-2 lg:grid-cols-3">

                                    {myProfileData.clips.map((clip, index) => (

                                        <div
                                            key={index}
                                            className=" border border-zinc-800 bg-[#09111f] transition-all duration-300 hover:border-cyan-500/30"
                                        >
                                            <div
                                                onClick={() => {

                                                    if (isYoutubeUrl(clip.clipUrl)) {
                                                        setSelectedVideo(
                                                            getYoutubeEmbedUrl(clip.clipUrl)
                                                        );
                                                    } else {
                                                        window.open(
                                                            clip.clipUrl,
                                                            "_blank"
                                                        );
                                                    }

                                                }}
                                                className="group cursor-pointer overflow-hidden"
                                            >

                                                <img
                                                    src={getClipThumbnail(clip.clipUrl)}
                                                    alt={clip.title}
                                                    className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    onError={(e) => {
                                                        e.currentTarget.src =
                                                            "/thumbnails/thumbnail1.webp";
                                                    }}
                                                />

                                            </div>

                                            <div className="border-t border-zinc-800 p-3">

                                                <h3 className="line-clamp-2 text-sm font-medium text-white">
                                                    {clip.title}
                                                </h3>

                                            </div>

                                        </div>

                                    ))}

                                </div>
                            </>

                        )}

                    </div>

                </div>

                {/* ACHIEVEMENTS */}
                <div className="mt-8 border border-zinc-800 bg-[#0b1120]">

                    <div className="h-1 bg-linear-to-r from-transparent via-cyan-400 to-transparent" />

                    <div className="p-4 sm:p-5">

                        <div className="mb-5 flex items-center gap-2">

                            <Trophy
                                className="text-cyan-400"
                                size={18}
                            />

                            <h2 className="text-lg font-semibold text-white">
                                Achievements
                            </h2>

                        </div>

                        {myProfileData?.achievements[0].title == "" ||
                            myProfileData?.achievements[0].title == undefined ? (

                            <div className="flex h-52 flex-col items-center justify-center border border-dashed border-zinc-700 bg-[#09111f] text-center">

                                <Trophy
                                    size={36}
                                    className="mb-3 text-zinc-600"
                                />

                                <h3 className="text-base font-semibold text-zinc-300">
                                    No Achievements Yet
                                </h3>

                                <p className="mt-1 text-sm text-zinc-500">
                                    You have not added any achievements.
                                </p>

                            </div>

                        ) : (

                            <>
                                {/* MOBILE SCROLL */}
                                <div className="flex gap-4 overflow-x-auto pb-2 md:hidden">

                                    {myProfileData?.achievements.map((ach, index) => (

                                        <div
                                            key={index}
                                            className="min-w-70 max-w-70 shrink-0 border border-zinc-800 bg-[#09111f"
                                        >
                                            <div
                                                onClick={() =>
                                                    setSelectedAchievement({
                                                        image: ach.image,
                                                        title: ach.title,
                                                    })
                                                }
                                                className="group cursor-pointer overflow-hidden"
                                            >
                                                <img
                                                    src={ach.image}
                                                    alt={ach.title}
                                                    className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            </div>

                                            <div className="flex items-center justify-between border-t border-zinc-800 p-3">

                                                <h3 className="line-clamp-2 text-sm font-medium text-white">
                                                    {ach.title}
                                                </h3>

                                                <button
                                                    onClick={() =>
                                                        setSelectedAchievement({
                                                            image: ach.image,
                                                            title: ach.title,
                                                        })
                                                    }
                                                    className="border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300"
                                                >
                                                    View
                                                </button>

                                            </div>

                                        </div>

                                    ))}

                                </div>

                                {/* DESKTOP GRID */}
                                <div className="hidden gap-5 md:grid md:grid-cols-2 lg:grid-cols-3">

                                    {myProfileData?.achievements.map((ach, index) => (

                                        <div
                                            key={index}
                                            className=" border border-zinc-800 bg-[#09111f] transition-all duration-300 hover:border-cyan-500/30"
                                        >
                                            <div
                                                onClick={() =>
                                                    setSelectedAchievement({
                                                        image: ach.image,
                                                        title: ach.title,
                                                    })
                                                }
                                                className="group block cursor-pointer overflow-hidden"
                                            >

                                                <img
                                                    src={ach.image}
                                                    alt={ach.title}
                                                    className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />

                                            </div>

                                            <div className="flex items-center justify-between border-t border-zinc-800 p-3">

                                                <h3 className="line-clamp-2 text-sm font-medium text-white">
                                                    {ach.title}
                                                </h3>

                                                <button
                                                    onClick={() =>
                                                        setSelectedAchievement({
                                                            image: ach.image,
                                                            title: ach.title,
                                                        })
                                                    }
                                                    className="border border-cyan-500/30   bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300 transition-all duration-300 hover:bg-cyan-500 hover:text-black"
                                                >
                                                    View
                                                </button>

                                            </div>

                                        </div>

                                    ))}

                                </div>
                            </>

                        )}

                    </div>

                </div>
                {/* ACHIEVEMENTS */}
                {selectedAchievement && (
                    <div
                        className="fixed inset-0 z-9999 flex items-center justify-center bg-black/90
                        p-4"
                        onClick={() => setSelectedAchievement(null)}
                    >
                        <div
                            className="relative w-full max-w-5xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close */}
                            <button
                                onClick={() => setSelectedAchievement(null)}
                                className="absolute -right-1 -top-12 z-20 text-3xl font-bold text-white cursor-pointer"
                            >
                                ×
                            </button>

                            {/* Image */}
                            <img
                                src={selectedAchievement.image}
                                alt={selectedAchievement.title}
                                className="max-h-[80vh] w-full object-contain border border-cyan-500/30 bg-[#09111f]"
                            />

                            {/* Title */}
                            <div
                                className="border border-t-0 border-cyan-500/30 bg-[#09111f] p-4"
                            >
                                <h3 className="text-center text-lg font-semibold text-white">
                                    {selectedAchievement.title}
                                </h3>
                            </div>
                        </div>
                    </div>
                )}

            </div>

            {/* AVATAR PREVIEW  */}
            {showAvatarPreview && (

                <div
                    className=" fixed inset-0 z-999 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
                    onClick={() => setShowAvatarPreview(false)}
                >

                    {/* Close Button */}
                    <button
                        onClick={() => setShowAvatarPreview(false)}
                        className=" absolute right-5 top-5 text-3xl font-light text-white cursor-pointer"
                    >
                        ×
                    </button>

                    {/* Image */}
                    <img
                        src={`/avatars/${myProfileData.avatar}`}
                        alt="avatar-preview"
                        onClick={(e) => e.stopPropagation()}
                        onError={(e) => {
                            e.currentTarget.src =
                                "https://cdn-icons-png.flaticon.com/512/149/149071.png";
                        }}
                        className=" max-h-[90vh] max-w-[90vw] object-contain border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.25)]"
                    />

                </div>

            )}

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
                                allow="accelerometer;
                                        autoplay;
                                        clipboard-write;
                                        encrypted-media;
                                        gyroscope;
                                        picture-in-picture;
                                        web-share"
                                allowFullScreen
                            />

                        </div>

                    </div>

                </div>

            )}
        </div>
    );
};

export default MyProfile;