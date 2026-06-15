import { useEffect, useState } from "react"
import { getProfileById } from "../../services/profileService"
import { useParams } from "react-router-dom";
import { Trophy, Shield, Users, Video, Clock3 } from "lucide-react";
import MyProfileSkeleton from "../../components/profile/skeletons/MyProfileSkeleton";
import type { ProfileType } from "../../types/profile.types";
import NoProfile from "../../components/profile/notFound/NoProfile";
import { toast } from "react-toastify";


const Profile = () => {

  const { id } = useParams();

  const [userProfile, setUserProfile] =
    useState<ProfileType | null>(null);

  const [loading, setLoading] =
    useState(true);

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
      case "youtube":
        return getYouTubeThumbnail(url);

      case "instagram":
        return getInstagramThumbnail();

      default:
        return "/thumbnails/thumbnail1.webp";
    }
  };

  const fetchProfile = async (
    profileId: string
  ) => {
    try {
      setLoading(true);

      const res = await getProfileById(profileId);

      setUserProfile(res.profile);

    } catch (error: any) {
      console.error(error);

      setUserProfile(null);

      toast.error(
        error?.response?.data?.message ||
        "Failed to load profile"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;

    fetchProfile(id);
  }, [id]);

  if (loading) {
    return <MyProfileSkeleton />;
  }

  if (!userProfile) {
    return <NoProfile />;
  }

  return (
    <div className="min-h-screen bg-[#050816] py-20 text-white">

      {/* BANNER */}
      <div className=" relative w-full overflow-hidden rounded-b-2xl aspect-4/1 max-h-80 min-h-35">
        <img
          src={`/banners/${userProfile.banner}`}
          alt="banner"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </div>


      <div className="mx-auto max-w-7xl px-4 pb-10">

        {/* PROFILE HEADER */}
        <div className="mt-6 border border-zinc-800 bg-[#0b1120] p-5 sm:p-6 lg:p-8">

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center">

            {/* AVATAR */}
            <div className="flex justify-center lg:justify-start">

              <div className="relative">

                <div className="absolute inset-0 bg-cyan-500/20 blur-3xl" />

                <img
                  src={`/avatars/${userProfile.avatar}`}
                  alt="avatar"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png";
                  }}
                  className="
                        relative
                        rounded-full
                        h-28
                        w-28
                        sm:h-36
                        sm:w-36
                        lg:h-60
                        lg:w-60
                        border-2
                        border-cyan-500/40
                        object-cover
                    "
                />

              </div>

            </div>

            {/* CONTENT */}
            <div className="flex-1">

              {/* DESKTOP TOP ROW */}
              <div className="hidden lg:flex items-start justify-between gap-6">

                {/* LEFT */}
                <div>

                  <h1 className="text-4xl font-black tracking-wide text-white">
                    {userProfile?.username}
                  </h1>

                  <p className="mt-1 text-sm text-zinc-500">
                    UID #{userProfile?.uid}
                  </p>

                </div>

                {/* RIGHT */}
                <div className="flex flex-col items-end gap-4">

                  <div
                    className={`
     border px-5 py-3 font-medium capitalize 
    ${userProfile.availability.status === "open for scrims"
                        ? "border-orange-400 bg-orange-400/10 text-orange-300"

                        : userProfile.availability.status === "looking for team"
                          ? "border-green-400 bg-green-400/10 text-green-300"

                          : userProfile.availability.status === "already in team"
                            ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"

                            : "border-zinc-700 text-zinc-300"
                      }
  `}
                  >
                    {userProfile?.availability.status}
                  </div>

                  <div className="flex gap-3">

                    {userProfile?.socialLinks.instagram && (
                      <a
                        href={`https://instagram.com/${userProfile?.socialLinks.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                                    flex
                                    h-11
                                    w-11
                                    items-center
                                    justify-center
                                    border
                                    border-zinc-700
                                    bg-[#09111f]
                                    transition-all
                                    duration-300
                                    hover:border-cyan-500/40
                                    hover:bg-cyan-500/10
                                "
                      >
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                          alt="instagram"
                          className="h-5 w-5"
                        />
                      </a>
                    )}

                    {userProfile?.socialLinks.discord && (
                      <a
                        href={`https://discord.com/${userProfile?.socialLinks.discord}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                                    flex
                                    h-11
                                    w-11
                                    items-center
                                    justify-center
                                    border
                                    border-zinc-700
                                    bg-[#09111f]
                                    transition-all
                                    duration-300
                                    hover:border-cyan-500/40
                                    hover:bg-cyan-500/10
                                "
                      >
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/5968/5968756.png"
                          alt="discord"
                          className="h-5 w-5"
                        />
                      </a>
                    )}

                  </div>

                </div>

              </div>

              {/* MOBILE HEADER */}
              <div className="lg:hidden  text-center">

                <h1 className="text-3xl font-black tracking-wide text-white">
                  {userProfile?.username}
                </h1>

                <p className="mt-1 text-sm text-zinc-500">
                  UID #{userProfile?.uid}
                </p>

              </div>

              <div className="flex justify-center lg:justify-start">

                <div className="flex items-center border border-cyan-500/30 bg-[#09111f]">

                  <div className="bg-cyan-500 px-3 py-3 text-xs font-black text-black">
                    ROLE
                  </div>

                  <div className="px-4 py-3 text-sm font-bold uppercase tracking-wider text-white">
                    {userProfile?.role}
                  </div>

                </div>

              </div>

              {/* TAGS */}
              <div className="mt-5 flex flex-wrap justify-center gap-3 lg:justify-start">

                <div className="border border-zinc-700 bg-[#09111f] px-4 py-2 text-sm text-zinc-300">
                  Age -  {userProfile?.age}
                </div>

                <div className="border border-zinc-700 bg-[#09111f] px-4 py-2 text-sm text-zinc-300">
                  {userProfile?.country}
                </div>


                <div className="flex flex-wrap gap-2">
                  {userProfile?.languages?.map((language, index) => (
                    <div
                      key={index}
                      className="
                border
                border-cyan-500/20
                bg-cyan-500/10
                px-3
                py-2
                text-sm
                text-cyan-300
            "
                    >
                      {language}
                    </div>
                  ))}

                </div>

              </div>

              {/* BIO */}
              <div className="mt-5">

                <p
                  className="
                        text-center
                        text-sm
                        leading-relaxed
                        text-zinc-300
                        lg:text-left
                    "
                >
                  {userProfile?.bio}
                </p>

              </div>

              {/* MOBILE ONLY STATUS + SOCIALS */}
              <div className="mt-6 lg:hidden">

                <div
                  className="
                        border
                        border-cyan-500/40
                        bg-cyan-500/10
                        px-4
                        py-3
                        text-center
                        text-xs
                        font-semibold
                        uppercase
                        tracking-[0.2em]
                        text-cyan-300
                    "
                >
                  Looking For Team
                </div>

                <div className="mt-4 flex justify-center gap-3">

                  {userProfile?.socialLinks.instagram && (
                    <a
                      href={`https://instagram.com/${userProfile?.socialLinks.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                                flex
                                h-12
                                w-12
                                items-center
                                justify-center
                                border
                                border-zinc-700
                                bg-[#09111f]
                            "
                    >
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                        alt="instagram"
                        className="h-6 w-6"
                      />
                    </a>
                  )}

                  {userProfile?.socialLinks.discord && (
                    <a
                      href={`https://discord.com/${userProfile?.socialLinks.discord}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                                flex
                                h-12
                                w-12
                                items-center
                                justify-center
                                border
                                border-zinc-700
                                bg-[#09111f]
                            "
                    >
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/5968/5968756.png"
                        alt="discord"
                        className="h-6 w-6"
                      />
                    </a>
                  )}

                </div>

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

              {userProfile?.stats?.currentRank ||
                userProfile?.stats?.kdRatio ||
                userProfile?.stats?.headshotPercentage ? (

                <div className="space-y-3">

                  <div className="border border-zinc-800 bg-[#09111f] p-4">

                    <p className="text-xs uppercase tracking-wider text-zinc-500">
                      BR Rank
                    </p>

                    <h3 className="mt-1 text-xl font-bold text-cyan-400">
                      {userProfile?.stats?.currentRank || "N/A"}
                    </h3>

                  </div>

                  <div className="border border-zinc-800 bg-[#09111f] p-4">

                    <p className="text-xs uppercase tracking-wider text-zinc-500">
                      KD Ratio
                    </p>

                    <h3 className="mt-1 text-lg font-semibold text-white">
                      {userProfile?.stats?.kdRatio || "N/A"}
                    </h3>

                  </div>

                  <div className="border border-zinc-800 bg-[#09111f] p-4">

                    <p className="text-xs uppercase tracking-wider text-zinc-500">
                      Headshot %
                    </p>

                    <h3 className="mt-1 text-lg font-semibold text-white">
                      {userProfile?.stats?.headshotPercentage
                        ? `${userProfile.stats.headshotPercentage}%`
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
                    Player has not added stats yet.
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
                    Lv. {userProfile?.experience?.level}
                  </h3>

                </div>

                <div className="border border-zinc-800 bg-[#09111f] p-4">

                  <p className="text-xs uppercase tracking-wider text-zinc-500">
                    Years Playing
                  </p>

                  <h3 className="mt-1 text-lg font-semibold text-white">
                    {userProfile?.experience?.yearsPlaying} Years
                  </h3>

                </div>

                <div className="border border-zinc-800 bg-[#09111f] p-4">

                  <p className="text-xs uppercase tracking-wider text-zinc-500">
                    Esports Experience
                  </p>

                  <h3 className="mt-1 text-lg font-semibold text-white">
                    {userProfile?.experience?.esportsExperience} Years
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

              {userProfile?.teamHistory[0].teamName == "" ||
                userProfile?.teamHistory[0].teamName == undefined ? (

                <div className="flex h-52 flex-col items-center justify-center border border-dashed border-zinc-700 bg-[#09111f] text-center">

                  <Users
                    size={36}
                    className="mb-3 text-zinc-600"
                  />

                  <h3 className="text-base font-semibold text-zinc-300">
                    No Team History
                  </h3>

                  <p className="mt-1 text-sm text-zinc-500">
                    Player has not added any previous teams.
                  </p>

                </div>

              ) : (

                <div className="max-h-105 space-y-3 overflow-y-auto pr-1">

                  {userProfile.teamHistory.map((team, index) => (

                    <div
                      key={index}
                      className="
                border
                border-zinc-800
                bg-[#09111f]
                p-4
                transition-all
                duration-300
                hover:border-cyan-500/30
              "
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

            {userProfile?.clips[0].title == "" ||
              userProfile?.clips[0].title == undefined ? (

              <div className="flex h-52 flex-col items-center justify-center border border-dashed border-zinc-700 bg-[#09111f] text-center">

                <Video
                  size={36}
                  className="mb-3 text-zinc-600"
                />

                <h3 className="text-base font-semibold text-zinc-300">
                  No Clips Added
                </h3>

                <p className="mt-1 text-sm text-zinc-500">
                  Player has not uploaded any clips yet.
                </p>

              </div>

            ) : (

              <>
                {/* MOBILE SCROLL */}
                <div className="flex gap-4 overflow-x-auto pb-2 md:hidden">

                  {userProfile.clips.map((clip, index) => (

                    <div
                      key={index}
                      className="
                min-w-70
                max-w-70
                shrink-0
                border
                border-zinc-800
                bg-[#09111f]
              "
                    >

                      <a
                        href={clip.clipUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block overflow-hidden"
                      >

                        <img
                          src={getClipThumbnail(clip.clipUrl)}
                          alt={clip.title}
                          className="
                    h-44
                    w-full
                    object-cover
                    transition-transform
                    duration-500
                    group-hover:scale-105
                  "
                          onError={(e) => {
                            e.currentTarget.src =
                              "/thumbnails/thumbnail1.webp";
                          }}
                        />

                      </a>

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

                  {userProfile.clips.map((clip, index) => (

                    <div
                      key={index}
                      className="
                border
                border-zinc-800
                bg-[#09111f]
                transition-all
                duration-300
                hover:border-cyan-500/30
              "
                    >

                      <a
                        href={clip.clipUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block overflow-hidden"
                      >

                        <img
                          src={getClipThumbnail(clip.clipUrl)}
                          alt={clip.title}
                          className="
                    h-48
                    w-full
                    object-cover
                    transition-transform
                    duration-500
                    group-hover:scale-105
                  "
                          onError={(e) => {
                            e.currentTarget.src =
                              "/thumbnails/thumbnail1.webp";
                          }}
                        />

                      </a>

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

            {userProfile?.achievements[0].title == "" ||
              userProfile?.achievements[0].title == undefined ? (

              <div className="flex h-52 flex-col items-center justify-center border border-dashed border-zinc-700 bg-[#09111f] text-center">

                <Trophy
                  size={36}
                  className="mb-3 text-zinc-600"
                />

                <h3 className="text-base font-semibold text-zinc-300">
                  No Achievements Yet
                </h3>

                <p className="mt-1 text-sm text-zinc-500">
                  Player has not added any achievements.
                </p>

              </div>

            ) : (

              <>
                {/* MOBILE SCROLL */}
                <div className="flex gap-4 overflow-x-auto pb-2 md:hidden">

                  {userProfile?.achievements.map((ach, index) => (

                    <div
                      key={index}
                      className="
                min-w-70
                max-w-70
                shrink-0
                border
                border-zinc-800
                bg-[#09111f]
              "
                    >

                      <a
                        href={ach.image}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block overflow-hidden"
                      >

                        <img
                          src={ach.image}
                          alt={ach.title}
                          className="
                    h-44
                    w-full
                    object-cover
                    transition-transform
                    duration-500
                    group-hover:scale-105
                  "
                        />

                      </a>

                      <div className="flex items-center justify-between border-t border-zinc-800 p-3">

                        <h3 className="line-clamp-2 text-sm font-medium text-white">
                          {ach.title}
                        </h3>

                        <a
                          href={ach.image}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                    border
                    border-cyan-500/30
                    bg-cyan-500/10
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    text-cyan-300
                  "
                        >
                          View
                        </a>

                      </div>

                    </div>

                  ))}

                </div>

                {/* DESKTOP GRID */}
                <div className="hidden gap-5 md:grid md:grid-cols-2 lg:grid-cols-3">

                  {userProfile?.achievements.map((ach, index) => (

                    <div
                      key={index}
                      className="
                border
                border-zinc-800
                bg-[#09111f]
                transition-all
                duration-300
                hover:border-cyan-500/30
              "
                    >

                      <a
                        href={ach.image}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block overflow-hidden"
                      >

                        <img
                          src={ach.image}
                          alt={ach.title}
                          className="
                    h-48
                    w-full
                    object-cover
                    transition-transform
                    duration-500
                    group-hover:scale-105
                  "
                        />

                      </a>

                      <div className="flex items-center justify-between border-t border-zinc-800 p-3">

                        <h3 className="line-clamp-2 text-sm font-medium text-white">
                          {ach.title}
                        </h3>

                        <a
                          href={ach.image}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                    border
                    border-cyan-500/30
                    bg-cyan-500/10
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    text-cyan-300
                    transition-all
                    duration-300
                    hover:bg-cyan-500
                    hover:text-black
                  "
                        >
                          View
                        </a>

                      </div>

                    </div>

                  ))}

                </div>
              </>

            )}

          </div>

        </div>

      </div>
    </div>
  )
}

export default Profile