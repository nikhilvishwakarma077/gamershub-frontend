import { Eye } from "lucide-react";
import { Link } from "react-router-dom";
import type { ProfileCards } from "../../types/profile.types";

type ProfileCardProps = {
    profile?: ProfileCards;
};


const ProfileCard = ({ profile }: ProfileCardProps) => {
    const statusStyles = {
        "open for scrims":
            "border-orange-400/40 bg-orange-500/20 text-orange-300",

        "looking for team":
            "border-green-400/40 bg-green-500/20 text-green-300",

        "already in team":
            "border-cyan-400/40 bg-cyan-500/20 text-cyan-300",
    };

    return (
        <div className="group relative flex h-full flex-col overflow-hidden border border-zinc-800 bg-[#0b1120] transition-all duration-300  hover:border-cyan-500/40 hover:shadow-[0_0_35px_rgba(6,182,212,0.12)]">

            {/* Top Accent */}
            <div className="h-1 bg-linear-to-r from-transparent via-cyan-400 to-transparent" />

            {/* HEADER */}
            <div className="flex items-start gap-4 p-5">

                <div className="relative shrink-0">

                    <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-xl" />

                    <img
                        src={`/avatars/${profile?.avatar}`}
                        alt={profile?.username}
                        onError={(e) => {
                            e.currentTarget.src =
                                "https://cdn-icons-png.flaticon.com/512/149/149071.png";
                        }}
                        className="relative h-20 w-20 rounded-full border-2 border-cyan-500/40 object-cover"
                    />

                </div>

                <div className="min-w-0 flex-1">

                    <h2 className="truncate text-xl font-bold text-white">
                        {profile?.username}
                    </h2>

                    <p className="mt-1 text-sm uppercase tracking-wider text-cyan-400">
                        {profile?.role}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">

                        <span className="border border-cyan-500/30 bg-cyan-500/10 px-2 py-1 text-xs font-semibold text-cyan-300">
                            LV {profile?.experience.level}
                        </span>

                        <span className="border border-zinc-700 bg-[#09111f] px-2 py-1 text-xs text-zinc-400">
                            UID #{profile?.uid}
                        </span>

                    </div>

                </div>

            </div>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-3 px-5">

                <div className="border border-zinc-800 bg-[#09111f] p-3">

                    <p className="text-[10px] uppercase tracking-widest text-zinc-500">
                        Country
                    </p>

                    <p className="mt-1 truncate text-sm font-semibold text-white">
                        {profile?.country}
                    </p>

                </div>

                <div className="border border-zinc-800 bg-[#09111f] p-3">

                    <p className="text-[10px] uppercase tracking-widest text-zinc-500">
                        ESP Experience
                    </p>

                    <p className="mt-1 text-sm font-semibold text-white">
                        {profile?.experience.esportsExperience} Years
                    </p>

                </div>

            </div>

            {/* STATUS */}
            <div className="px-5 pt-4">

                <div
                    className={`
                        rounded-sm
                        border
                        px-3
                        py-3
                        text-center
                        text-xs
                        font-bold
                        uppercase
                        tracking-wider
                        ${statusStyles[
                        profile?.availability.status as keyof typeof statusStyles
                        ] ||
                        "border-zinc-700 bg-zinc-800 text-zinc-300"
                        }
                    `}
                >
                    {profile?.availability.status}
                </div>

            </div>

            <div className="flex-1" />

            {/* FOOTER */}
            <div className="flex items-center justify-between border-t border-zinc-800 p-5">

                <div className="text-xs text-zinc-500">
                    Gamer Profile
                </div>

                <Link
                    to={`/profile/${profile?._id}`}
                    className="
                        flex
                        items-center
                        gap-2
                        border
                        border-cyan-500
                        bg-cyan-500/10
                        px-5
                        py-2.5
                        text-sm
                        font-semibold
                        text-cyan-300
                        transition-all
                        duration-300
                        hover:bg-cyan-500
                        hover:text-black
                    "
                >
                    <Eye size={17} />
                    View
                </Link>

            </div>

        </div>
    );
};

export default ProfileCard;