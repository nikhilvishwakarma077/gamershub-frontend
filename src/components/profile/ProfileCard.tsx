import {
    Globe,
    ShieldCheck,
    Eye,
} from "lucide-react";
import { Link } from "react-router-dom";
import type { ProfileCards } from "../../types/profile.types";

type ProfileCardProps = {
    profile?: ProfileCards;
};

const ProfileCard = ({ profile }: ProfileCardProps) => {

    const statusStyles = {
        "open for scrims":
            "border-orange-400/40 bg-orange-500/50 text-white",

        "looking for team":
            "border-green-400/40 bg-green-500/50 text-white",

        "already in team":
            "border-cyan-400/40 bg-cyan-500/50 text-white",
    };

    return (
        <div
            className="
                group
                relative
                overflow-hidden
                border
                border-zinc-800
                bg-[#0b1120]
                transition-all
                duration-300
                hover:border-cyan-500/40
                hover:shadow-[0_0_30px_rgba(6,182,212,0.08)]
            "
        >

            {/* TOP GLOW */}
            <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-transparent via-cyan-400 to-transparent opacity-70" />

            {/* HEADER */}
            <div className="border-b border-zinc-800 p-4">

                <div className="flex items-center justify-between">

                    <div className="border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-300">
                        Level {profile?.experience.level}
                    </div>

                    <div className="text-xs text-zinc-500">
                        UID #{profile?.uid}
                    </div>

                </div>

            </div>

            {/* AVATAR */}
            <div className="relative flex flex-col items-center px-6 pt-6 text-center">

                <div className="absolute top-10 h-24 w-24 rounded-full bg-cyan-500/15 blur-2xl" />

                <img
                    src={`/avatars/${profile?.avatar}`}
                    alt={profile?.username}
                    onError={(e) => {
                        e.currentTarget.src =
                            "https://cdn-icons-png.flaticon.com/512/149/149071.png";
                    }}
                    className="
                        relative
                        z-10
                        h-24
                        w-24
                        border
                        border-cyan-500/30
                        object-cover
                    "
                />

                <h2 className="mt-5 text-xl font-bold text-white">
                    {profile?.username}
                </h2>

                <div className="mt-3 inline-flex items-center gap-2 border border-zinc-700 bg-[#09111f] px-3 py-2 text-xs uppercase tracking-wider text-cyan-300">

                    <ShieldCheck
                        size={14}
                        className="text-cyan-400"
                    />

                    {profile?.role}

                </div>

            </div>

            {/* INFO */}
            <div className="space-y-3 p-5">

                {/* COUNTRY */}
                <div className="border border-zinc-800 bg-[#09111f] p-3">

                    <div className="flex items-center gap-3">

                        <Globe
                            size={18}
                            className="text-cyan-400"
                        />

                        <div>

                            <p className="text-[11px] uppercase tracking-wider text-zinc-500">
                                Country
                            </p>

                            <h3 className="text-sm font-medium text-white">
                                {profile?.country}
                            </h3>

                        </div>

                    </div>

                </div>

                {/* EXPERIENCE */}
                <div className="border border-zinc-800 bg-[#09111f] p-3">

                    <p className="text-[11px] uppercase tracking-wider text-zinc-500">
                        Esports Experience
                    </p>

                    <h3 className="mt-1 text-lg font-bold text-white">
                        {profile?.experience.esportsExperience} Years
                    </h3>

                </div>

                {/* STATUS */}
                <div
                    className={`
                        border p-3 text-center text-sm font-semibold uppercase tracking-wide
                        ${statusStyles[
                            profile?.availability.status as keyof typeof statusStyles
                        ] || "border-zinc-700 bg-zinc-800 text-zinc-300"}
                    `}
                >
                    {profile?.availability.status}
                </div>

            </div>

            {/* CTA */}
            <div className="p-5 pt-0">

                <Link
                    to={`/profile/${profile?._id}`}
                    className="
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        border
                        border-cyan-500
                        bg-cyan-500/10
                        px-4
                        py-3
                        font-semibold
                        text-cyan-300
                        transition-all
                        duration-300
                        hover:bg-cyan-500
                        hover:text-black
                    "
                >
                    <Eye size={18} />

                    <span>View Profile</span>

                </Link>

            </div>

        </div>
    );
};

export default ProfileCard;