import { useEffect, useMemo, useState } from "react";
import ProfileCard from "../../components/profile/ProfileCard";
import { getAllProfiles } from "../../services/profileService";
import ProfileCardSkeleton from "../../components/profile/skeletons/ProfileCardSkeleton";
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
        <div className="relative min-h-screen overflow-hidden bg-[#050816] px-4 pt-20 pb-16">


            {/* Large Orbit Square */}
            <div className="pointer-events-none absolute left-[5%] top-[30%] h-24 w-24 border border-cyan-500/35 animate-orbit-slow" />

            {/* Rotating Diamond */}
            <div className="pointer-events-none absolute right-[10%] top-[18%] h-12 w-12 border border-cyan-400/30 animate-spin-slow" />

            {/* Floating Glass Square */}
            <div className="pointer-events-none absolute left-[15%] top-[55%] h-20 w-20 border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-md animate-float-y" />

            {/* Diagonal Moving Square */}
            <div className="pointer-events-none absolute right-[20%] top-[65%] h-14 w-14 border border-cyan-500/20 bg-cyan-500/10 animate-drift-diagonal" />

            {/* Circle Glow */}
            <div className="pointer-events-none absolute left-[45%] top-[15%] h-12 w-12 rounded-full border border-cyan-500/20 animate-pulse-glow" />

            {/* Rotating Diamond */}
            <div className="pointer-events-none absolute right-[35%] bottom-[15%] h-16 w-16 rotate-45 border border-cyan-500/20 animate-spin-reverse" />

            {/* Large Outline Box */}
            <div className="pointer-events-none absolute left-[70%] top-[35%] h-32 w-32 border border-cyan-500/10 animate-float-slow" />

            {/* Small Particle */}
            <div className="pointer-events-none absolute left-[30%] bottom-[20%] h-3 w-3 rounded-full bg-cyan-400/40 animate-particle-1" />

            {/* Small Particle */}
            <div className="pointer-events-none absolute right-[25%] top-[45%] h-2 w-2 rounded-full bg-cyan-300/40 animate-particle-2" />


            {/* Glow Effects */}
            <div className="absolute left-0 top-20 h-100 w-100 rounded-full bg-cyan-500/10 blur-3xl" />
            <div className="absolute right-0 top-40 h-100 w-100 rounded-full bg-purple-500/10 blur-3xl" />

            <div className="relative z-10 mx-auto max-w-7xl">

                {/* HERO HEADER */}
                <div className="mb-12  border border-zinc-800 bg-[#0b1120]/80 p-6 backdrop-blur-md sm:p-8 lg:p-10">

                    <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

                        <div className="max-w-3xl">

                            <div className="mb-4 inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-xs font-semibold tracking-[0.25em] text-cyan-300">
                                FIND YOUR NEXT TEAMMATE
                            </div>

                            <h1 className="text-4xl font-black uppercase text-white tracking-tight sm:text-5xl lg:text-6xl">
                                Explore{" "}
                                <span className="bg-linear-to-r from-cyan-300 to-cyan-500 bg-clip-text text-transparent">
                                    Profiles
                                </span>
                            </h1>

                            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
                                Discover skilled gamers, esports players,
                                IGLs, rushers, snipers and future teammates.
                                Build connections and assemble the perfect squad.
                            </p>

                        </div>

                        <div className="w-full lg:w-auto">

                            <select
                                value={selectedRole}
                                onChange={(e) =>
                                    setSelectedRole(e.target.value)
                                }
                                className="
                            w-full
                            border border-zinc-700
                            bg-[#09111f]
                            px-5 py-4
                            text-zinc-300
                            outline-none
                            transition-all
                            focus:border-cyan-500
                            lg:min-w-[320px]
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

                    </div>

                </div>



                {/* PROFILE GRID */}
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

                    {loading ? (

                        Array.from({ length: 6 }).map((_, index) => (
                            <ProfileCardSkeleton key={index} />
                        ))

                    ) : filteredProfiles.length < 1 ? (

                        <div
                            className="
                        col-span-full
                        flex
                        min-h-80
                        flex-col
                        items-center
                        justify-center
                        rounded-3xl
                        border
                        border-zinc-800
                        bg-[#0b1120]
                        p-8
                        text-center
                    "
                        >

                            <div className="mb-4 text-5xl">
                                🎮
                            </div>

                            <h2 className="text-2xl font-bold text-white">
                                No Profiles Found
                            </h2>

                            <p className="mt-3 max-w-md text-zinc-400">
                                No players match the selected role.
                                Try changing your filters and explore more gamers.
                            </p>

                        </div>

                    ) : (

                        filteredProfiles.map((profile) => (
                            <ProfileCard
                                key={profile._id}
                                profile={profile}
                            />
                        ))

                    )}

                </div>

            </div>
        </div>
    );
};

export default Profiles;