import {Globe,ShieldCheck,Eye,} from "lucide-react";
import { Link } from "react-router-dom";
import type { ProfileCards } from "../../types/profile.types";

type ProfileCardProps = {
    profile?: ProfileCards;

};

const ProfileCard = ({ profile }: ProfileCardProps) => {

    return (
        <div
            className="
                w-full max-w-sm rounded-xl
                border border-zinc-800
                bg-[#4b3d6680]
                p-5
            "
        >

            {/* LEVEL */}
            <div className="mb-5 flex justify-between">

                <div className="rounded-md bg-cyan-400/10 px-3 py-1 text-sm font-medium text-cyan-300">
                    Level {profile?.experience.level}
                </div>

                <div className="rounded-md border border-zinc-700 px-3 py-1 text-sm text-zinc-400">
                    UID #{profile?.uid}
                </div>
            </div>

            {/* AVATAR */}
            <div className="flex flex-col items-center text-center">

                <img
                    // src={profile?.avatar}
                    src={`/avatars/${profile?.avatar}`}
                    // src={avatar1}
                    alt={profile?.username}
                    onError={(e) => {
                        e.currentTarget.src =
                            "https://cdn-icons-png.flaticon.com/512/149/149071.png";
                    }}
                    className="h-24 w-24 rounded-full object-cover"
                />

                <h2 className="mt-4 text-2xl font-bold text-white">
                    {profile?.username}
                </h2>

                <div className="mt-2 flex items-center gap-2 text-zinc-400">
                    <ShieldCheck
                        size={16}
                        className="text-cyan-400"
                    />

                    <span className="uppercase">{profile?.role}</span>
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
                    <Globe
                        size={18}
                        className="text-cyan-400"
                    />

                    <div>
                        <p className="text-xs text-zinc-500">
                            Country
                        </p>

                        <h3 className="text-sm font-medium text-white">
                            {profile?.country}
                        </h3>
                    </div>
                </div>

                {/* LANGUAGES */}
                {/* <div
                    className="
                        flex items-center gap-3
                        rounded-lg border border-zinc-800
                        bg-[#09111f]
                        px-4 py-3
                    "
                >
                    <Languages
                        size={18}
                        className="text-cyan-400"
                    />

                    <div>
                        <p className="text-xs text-zinc-500">
                            Prefered Languages
                        </p>

                        <h3 className="text-sm font-medium text-white">
                            {profile.languages.join(", ")}
                        </h3>
                    </div>
                </div> */}

                {/* ESP EXPERIENCE */}
                <div
                    className="
                        rounded-lg border border-zinc-800
                        bg-[#09111f]
                        px-4 py-3
                    "
                >
                    <p className="text-xs text-zinc-500">
                        Esports Experience
                    </p>

                    <h3 className="mt-1 text-lg font-semibold text-white">
                        {
                            profile?.experience
                                .esportsExperience
                        }{" "}
                        Years
                    </h3>
                </div>

                {/* STATUS */}
                <div
                    className={`
    rounded-lg px-4 py-3 text-center font-medium
    ${profile?.availability.status === "open for scrims"
                            ? "bg-orange-400 text-black"

                            : profile?.availability.status === "looking for team"
                                ? "bg-green-400 text-black"

                                : profile?.availability.status === "already in team"
                                    ? "bg-cyan-400 text-black"

                                    : "bg-zinc-700 text-white"
                        }
  `}
                >
                    {profile?.availability.status}
                </div>
            </div>

            {/* BUTTON */}
            <Link
                to={`/profile/${profile?._id}`}
                className="
                    mt-5 flex items-center justify-center gap-2
                    rounded-lg
                    border border-zinc-700
                    bg-[#09111f]
                    px-4 py-3
                    text-white
                "
            >
                <Eye size={18} />

                <span>View Profile</span>
            </Link>
        </div>
    );
};

export default ProfileCard;