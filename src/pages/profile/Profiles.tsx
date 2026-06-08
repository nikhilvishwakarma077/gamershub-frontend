import { useEffect, useMemo, useState } from "react";
import ProfileCard from "../../components/profile/ProfileCard";
import { getAllProfiles } from "../../services/profileService";
import ProfileCardSkeleton from "../../components/profile/skeletons/ProfileCardSkeleton";
import PageHeader from "../../components/shared/PageHeader";
import type { ProfileCards } from "../../types/profile.types";
import { toast } from "react-toastify";


const Profiles = () => {

   const [profiles, setProfiles] = useState<ProfileCards[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedRole, setSelectedRole] = useState("");

    const fetchAllProfiles = async () => {
        try {
            const res = await getAllProfiles();

            setProfiles(res.profiles || []);
        } catch (error: any) {
            console.error(error);

            toast.error(
                error?.response?.data?.message ||
                "Failed to load profiles"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllProfiles();
    }, []);

    const filteredProfiles = useMemo(() => {
        return profiles.filter((profile) => {
            return (
                !selectedRole ||
                profile.role === selectedRole
            );
        });
    }, [profiles, selectedRole]);
 

    return (
        <div className="min-h-screen bg-zinc-950 px-4 py-10">

            {/* BACKGROUND */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-size-[28px_28px] opacity-30" />

            <div className="relative z-10 mx-auto max-w-7xl">

                {/* HEADER */}
                <div
                    className="
        flex flex-col gap-4 pr-4 pb-10
        sm:pr-6
        md:flex-row md:items-center md:justify-between
    "
                >

                    <PageHeader
                        title="Explore"
                        highlight="Profiles"
                        subtitle="
            Discover skilled gamers,
            esports players,
            and future teammates.
        "
                    />

                    <select
                        value={selectedRole}
                        onChange={(e) =>
                            setSelectedRole(e.target.value)
                        }
                        className="
        rounded-2xl border border-zinc-800
        bg-zinc-900
        px-5 py-4
        text-zinc-300
        outline-none
        focus:border-cyan-400
        max-w-95
    "
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

                </div>

                {/* FILTERS */}
                {/* <FilterBar searchPlaceholder="Search gamers profile..." /> */}

                {/* GRID */}
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

                    {
                        loading ? (

                            Array.from({ length: 6 }).map((_, index) => (
                                <ProfileCardSkeleton key={index} />
                            ))

                        ) : filteredProfiles.length < 1 ? (

                            <div
                                className="
                    col-span-full
                    flex min-h-75 flex-col
                    items-center justify-center
                    rounded-xl border border-zinc-800
                    bg-zinc-900/40
                    p-6 text-center
                "
                            >

                                <h2 className="text-2xl font-bold text-white">
                                    No Profile Found
                                </h2>

                                <p className="mt-2 text-zinc-400">
                                    Try changing your filters
                                </p>

                            </div>

                        ) : (

                            filteredProfiles.map((profile) => (
                                <ProfileCard
                                    key={profile._id}
                                    profile={profile}
                                />
                            ))

                        )
                    }

                </div>
            </div>
        </div>
    );
};

export default Profiles;