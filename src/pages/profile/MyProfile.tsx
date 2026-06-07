import {
    Trophy,
    Globe,
    Languages,
    Gamepad2,
    Shield,
    Users,
    Video,
    Clock3,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { myProfile } from "../../services/profileService";
import { useProfileStore } from "../../store/profileStore";
import NoProfile from "../../components/profile/notFound/NoProfile";
import MyProfileSkeleton from "../../components/profile/skeletons/MyProfileSkeleton";
import type { MyProfileType } from "../../types/profile.types";
// import avatar1 from "..//../assets/avatars/avatar5.png"



const MyProfile = () => {
    const navigate = useNavigate();

    const [myProfileData, setMyProfileData] = useState<MyProfileType | null>(null);
    const [loading, setLoading] = useState(false);

    const setProfile = useProfileStore((state) => state.setProfile);

    const fetchProfile = async () => {
        try {
            setLoading(true)
            const res = await myProfile();
            setProfile(res.profile);
            setMyProfileData(res.profile);
            setLoading(false)

        } catch (error) {
            console.log(error);
            setMyProfileData(null);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {

        fetchProfile();

    }, []);

    if (loading) {
        return <MyProfileSkeleton />;
    }

    if (!myProfileData) return <NoProfile />;

    return (
        <div className="min-h-screen bg-[#050816] text-white">

            {/* BANNER */}
            <div
                className="
    relative
    w-full
    overflow-hidden
    rounded-b-2xl
    aspect-4/1
    max-h-80
    min-h-35
  "
            >
                <img
                    src={`/banners/${myProfileData.banner}`}
                    alt="banner"
                    className="
      absolute inset-0
      h-full w-full
      object-cover
      object-center
    "
                />
            </div>

            <div className="mx-auto max-w-7xl px-4 pb-10">

                {/* PROFILE CARD */}
                <div className="mt-6 flex flex-col gap-6 rounded-xl border border-zinc-800 bg-[#0b1120] p-5 md:flex-row md:items-center md:justify-between">

                    {/* LEFT */}
                    <div className="flex flex-col gap-4 md:flex-row md:items-center">

                        <img
                            src={`/avatars/${myProfileData.avatar}`}
                            // src={avatar1}
                            onError={(e) => {
                                e.currentTarget.src =
                                    "https://cdn-icons-png.flaticon.com/512/149/149071.png";
                            }}
                            alt="avatar"
                            className="h-38 w-38 rounded-full border border-zinc-700 object-cover"
                        />

                        <div>
                            <h1 className="text-3xl font-bold">
                                {myProfileData.username}
                            </h1>

                            <p className="mt-1 text-zinc-400">
                                UID #{myProfileData?.uid}
                            </p>

                            <p className="mt-4 max-w-2xl text-zinc-300">
                                {myProfileData?.bio}
                            </p>

                            <div className="mt-5 flex flex-wrap gap-3 ">

                                <div className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-[#0b1120] px-4 py-2">
                                    <Gamepad2 size={18} />
                                    <span>{myProfileData?.role}</span>
                                </div>

                                <div className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-[#0b1120] px-4 py-2">
                                    <Languages size={18} />

                                    <span>
                                        {myProfileData?.languages?.join(", ")}
                                    </span>
                                </div>


                                <div className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-[#0b1120] px-4 py-2">
                                    <Globe size={18} />
                                    <span>{myProfileData?.country}</span>
                                </div>

                                <div className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-[#0b1120] px-4 py-2">
                                    <Shield size={18} />
                                    <span>Age - {myProfileData?.age}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT BUTTON */}
                    <div>
                        <button
                            className={`
    rounded-lg border px-5 py-3 font-medium
    ${myProfileData.availability.status === "open for scrims"
                                    ? "border-orange-400 bg-orange-400/10 text-orange-300"

                                    : myProfileData.availability.status === "looking for team"
                                        ? "border-green-400 bg-green-400/10 text-green-300"

                                        : myProfileData.availability.status === "already in team"
                                            ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"

                                            : "border-zinc-700 text-zinc-300"
                                }
  `}
                        >
                            {myProfileData.availability.status}
                        </button>

                        <div className="mt-3">

                            <button
                                onClick={() => navigate(`/edit-profile/${myProfileData?._id}`)}
                                className="rounded-lg border text-black font-semibold border-zinc-700 bg-cyan-500 px-5 py-2"
                            >
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </div>

                {/* 3 CARDS GRID */}
                <div className="mt-6 grid gap-6 lg:grid-cols-3">

                    {/* STATS */}
                    <div className="rounded-xl border border-zinc-800 bg-[#0b1120] p-5">

                        <div className="mb-4 flex items-center gap-2">
                            <Shield
                                className="text-cyan-400"
                                size={18}
                            />

                            <h2 className="text-xl font-semibold">
                                Player Stats
                            </h2>
                        </div>

                        {myProfileData?.stats?.currentRank ||
                            myProfileData?.stats?.kdRatio ||
                            myProfileData?.stats?.headshotPercentage ? (

                            <div className="space-y-3">

                                <div className="rounded-lg border border-zinc-800 bg-[#09111f] p-4">
                                    <p className="text-sm text-zinc-400">
                                        BR Rank
                                    </p>

                                    <h3 className="mt-1 text-2xl font-semibold text-cyan-400">
                                        {myProfileData?.stats?.currentRank || "N/A"}
                                    </h3>
                                </div>

                                <div className="rounded-lg border border-zinc-800 bg-[#09111f] p-4">
                                    <p className="text-sm text-zinc-400">
                                        KD Ratio
                                    </p>

                                    <h3 className="mt-1 text-xl font-semibold">
                                        {myProfileData?.stats?.kdRatio || "N/A"}
                                    </h3>
                                </div>

                                <div className="rounded-lg border border-zinc-800 bg-[#09111f] p-4">
                                    <p className="text-sm text-zinc-400">
                                        Headshot %
                                    </p>

                                    <h3 className="mt-1 text-xl font-semibold">
                                        {myProfileData?.stats?.headshotPercentage
                                            ? `${myProfileData.stats.headshotPercentage}%`
                                            : "N/A"}
                                    </h3>
                                </div>
                            </div>

                        ) : (

                            <div className="flex h-52 flex-col items-center justify-center rounded-xl border border-dashed border-zinc-700 bg-[#09111f] text-center">

                                <Shield
                                    size={40}
                                    className="mb-3 text-zinc-600"
                                />

                                <h3 className="text-lg font-semibold text-zinc-300">
                                    No Stats Available
                                </h3>

                                <p className="mt-1 text-sm text-zinc-500">
                                    You have not added stats yet.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* EXPERIENCE */}
                    <div className="rounded-xl border border-zinc-800 bg-[#0b1120] p-5">

                        <div className="mb-4 flex items-center gap-2">
                            <Shield className="text-cyan-400" size={18} />

                            <h2 className="text-xl font-semibold">
                                Experience
                            </h2>
                        </div>

                        <div className="space-y-3">

                            <div className="rounded-lg border border-zinc-800 bg-[#09111f] p-4">
                                <p className="text-sm text-zinc-400">
                                    ID Level
                                </p>

                                <h3 className="mt-1 text-2xl font-semibold text-cyan-400">
                                    Lv. {myProfileData?.experience?.level}
                                </h3>
                            </div>

                            <div className="rounded-lg border border-zinc-800 bg-[#09111f] p-4">
                                <p className="text-sm text-zinc-400">
                                    Years Playing
                                </p>

                                <h3 className="mt-1 text-xl font-semibold">
                                    {myProfileData?.experience?.yearsPlaying} Years
                                </h3>
                            </div>

                            <div className="rounded-lg border border-zinc-800 bg-[#09111f] p-4">
                                <p className="text-sm text-zinc-400">
                                    Esports Experience
                                </p>

                                <h3 className="mt-1 text-xl font-semibold">
                                    {myProfileData?.experience?.esportsExperience} Years
                                </h3>
                            </div>
                        </div>
                    </div>

                    {/* TEAM HISTORY */}
                    <div className="rounded-xl border border-zinc-800 bg-[#0b1120] p-5">

                        <div className="mb-4 flex items-center gap-2">
                            <Users
                                className="text-cyan-400"
                                size={18}
                            />

                            <h2 className="text-xl font-semibold">
                                Previous Teams
                            </h2>
                        </div>

                        {myProfileData?.teamHistory[0].teamName == "" || myProfileData?.teamHistory[0].teamName == undefined || myProfileData?.teamHistory[0].role == "" || myProfileData?.teamHistory[0].role == undefined || myProfileData?.teamHistory[0].duration == "" || myProfileData?.teamHistory[0].duration == undefined ? (


                            <div className="flex h-52 flex-col items-center justify-center rounded-xl border border-dashed border-zinc-700 bg-[#09111f] text-center">

                                <Users
                                    size={40}
                                    className="mb-3 text-zinc-600"
                                />

                                <h3 className="text-lg font-semibold text-zinc-300">
                                    No Team History
                                </h3>

                                <p className="mt-1 text-sm text-zinc-500">
                                    You have not added any previous teams.
                                </p>
                            </div>

                        ) : (
                            <div className="space-y-3 max-h-105 overflow-y-auto pr-1">

                                {myProfileData.teamHistory.map((team, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col gap-2 rounded-lg border border-zinc-800 bg-[#09111f] p-4"
                                    >
                                        <div>
                                            <h3 className="wrap-break-word text-base font-semibold">
                                                {team.teamName}
                                            </h3>

                                            <p className="text-sm text-zinc-400">
                                                {team.role}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-2 text-xs text-zinc-400">
                                            <Clock3 size={14} />

                                            <span>
                                                {team.duration}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* CLIPS */}
                <div className="mt-8 rounded-xl border border-zinc-800 bg-[#0b1120] p-6">

                    <div className="mb-4 flex items-center gap-2">
                        <Video className="text-cyan-400" />

                        <h2 className="text-xl font-semibold">
                            Featured Clips
                        </h2>
                    </div>

                    {myProfileData?.clips[0].title == "" || myProfileData?.clips[0].title == undefined ? (


                        <div className="flex h-52 flex-col items-center justify-center rounded-xl border border-dashed border-zinc-700 bg-[#09111f] text-center">

                            <Video
                                size={40}
                                className="mb-3 text-zinc-600"
                            />

                            <h3 className="text-lg font-semibold text-zinc-300">
                                No Clips Added
                            </h3>

                            <p className="mt-1 text-sm text-zinc-500">
                                You have not uploaded any clips yet.
                            </p>
                        </div>

                    ) : (
                        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                            {myProfileData.clips.map((clip, index) => (
                                <div
                                    key={index}
                                    className="overflow-hidden rounded-lg border border-zinc-800 bg-[#09111f]"
                                >
                                    <a href={clip.clipUrl} target="_blank">

                                        <img
                                            src={clip.thumbnailUrl}
                                            alt={clip.title}
                                            className="h-48 w-full object-cover"
                                        />
                                    </a>
                                    <div className="p-3">
                                        <h3 className="text-sm font-medium">
                                            {clip.title}
                                        </h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* ACHIEVEMENTS */}
                <div className="mt-8 rounded-xl border border-zinc-800 bg-[#0b1120] p-6">
                    <div className="mb-4 flex items-center gap-2">
                        <Trophy className="text-cyan-400" />
                        <h2 className="text-xl font-semibold">Achievements</h2>
                    </div>


                    {myProfileData?.achievements[0].title == "" || myProfileData?.achievements[0].title == undefined ? (
                        <div className="flex h-52 flex-col items-center justify-center rounded-xl border border-dashed border-zinc-700 bg-[#09111f] text-center">

                            <Trophy
                                size={40}
                                className="mb-3 text-zinc-600"
                            />

                            <h3 className="text-lg font-semibold text-zinc-300">
                                No Achievements Yet
                            </h3>

                            <p className="mt-1 text-sm text-zinc-500">
                                You have not added any achievements.
                            </p>
                        </div>


                    ) : (
                        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                            {myProfileData?.achievements.map((ach, index) => (
                                <div
                                    key={index}
                                    className="overflow-hidden rounded-lg border border-zinc-800 bg-[#09111f]"
                                >
                                    <img
                                        src={ach.image}
                                        alt={ach.title}
                                        className="h-48 w-full object-cover"
                                    />

                                    <div className="p-3">
                                        <h3 className="text-sm font-medium">
                                            {ach.title}
                                        </h3>
                                    </div>
                                </div>
                            ))}
                        </div>

                    )}
                </div>

            </div>
        </div>
    );
};

export default MyProfile;