import { useCallback, useEffect, useMemo, useState } from "react";
import { getAllPlayerRequests } from "../../services/playerRequestService";
import PlayerRequestCardSkeleton from "../../components/findPlayer/skeletons/PlayerRequestCardSkeleton";
import FindPlayerCard from "../../components/findPlayer/FindPlayerCard";
import NoPlayerRequest from "../../components/findPlayer/notFound/NoPlayerRequest";
import type { PlayerRequestData } from "../../types/findPlayer.types";
import { toast } from "react-toastify";


const FindPlayer = () => {

    const [playerRequests, setPlayerRequests] = useState<PlayerRequestData[]>([])
    const [loading, setLoading] = useState(false)

    const [selectedRole, setSelectedRole] = useState("");
    const [selectedJoiningType, setSelectedJoiningType] = useState("");

    const filteredRequests = useMemo(() => {
        return playerRequests.filter((request) => {
            const roleMatch =
                !selectedRole ||
                request.role === selectedRole;

            const joiningTypeMatch =
                !selectedJoiningType ||
                request.joiningType === selectedJoiningType;

            return roleMatch && joiningTypeMatch;
        });
    }, [
        playerRequests,
        selectedRole,
        selectedJoiningType,
    ]);


    const getTimeLeft = (expiresAt: string | Date) => {

        const now = new Date().getTime();

        const expiry = new Date(expiresAt).getTime();

        const diff = expiry - now;

        if (diff <= 0) {
            return "Expired";
        }

        const seconds = Math.floor(diff / 1000);

        const minutes = Math.floor(seconds / 60);

        const hours = Math.floor(minutes / 60);

        const days = Math.floor(hours / 24);

        if (days > 0) {
            return `${days} day${days > 1 ? "s" : ""} left`;
        }

        if (hours > 0) {
            return `${hours} hour${hours > 1 ? "s" : ""} left`;
        }

        if (minutes > 0) {
            return `${minutes} min left`;
        }

        return `${seconds} sec left`;
    };

    const getTimeAgo = (createdAt: string | Date) => {

        const now = new Date().getTime();

        const created = new Date(createdAt).getTime();

        const diff = now - created;

        const seconds = Math.floor(diff / 1000);

        const minutes = Math.floor(seconds / 60);

        const hours = Math.floor(minutes / 60);

        const days = Math.floor(hours / 24);

        if (days > 0) {
            return `${days} day${days > 1 ? "s" : ""} ago`;
        }

        if (hours > 0) {
            return `${hours} hour${hours > 1 ? "s" : ""} ago`;
        }

        if (minutes > 0) {
            return `${minutes} min ago`;
        }

        return `${seconds} sec ago`;
    }

    const fetchAllPlayerRequests =
        useCallback(async () => {

            try {
                setLoading(true);

                const res =
                    await getAllPlayerRequests();

                setPlayerRequests(
                    res.playerRequests || []
                );

            } catch (error: any) {

                toast.error(
                    error?.response?.data?.message ||
                    "Failed to fetch player requests"
                );

                console.error(error);

            } finally {

                setLoading(false);
            }

        }, []);

    useEffect(() => {
        fetchAllPlayerRequests();
    }, [fetchAllPlayerRequests]);


    return (
        <section className="relative min-h-screen overflow-hidden bg-[#050816] px-4 pt-28 pb-16 text-white">

            {/* GRID BG */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-size-[32px_32px] opacity-30" />

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

                {playerRequests.length >= 1 && (
                    <>
                        {/* HERO */}
                        <div className="mb-10 border border-zinc-800 bg-[#0b1120]/80 p-6 backdrop-blur-md sm:p-8 lg:p-10">

                            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

                                {/* LEFT */}
                                <div className="max-w-3xl">

                                    <div className="mb-4 inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-xs font-semibold tracking-[0.25em] text-cyan-300">
                                        RECRUIT • CONNECT • DOMINATE
                                    </div>

                                    <h1 className="text-4xl font-black uppercase tracking-tight sm:text-5xl lg:text-6xl">
                                        Find{" "}
                                        <span className="bg-linear-to-r from-cyan-300 to-cyan-500 bg-clip-text text-transparent">
                                            Players
                                        </span>
                                    </h1>

                                    <p className="mt-5 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
                                        Discover skilled teammates for ranked,
                                        scrims and esports tournaments.
                                        Build your dream roster and dominate
                                        the battlefield.
                                    </p>

                                </div>

                                {/* FILTERS */}
                                <div className="flex w-full flex-col gap-3 lg:w-auto">

                                    {/* ROLE */}
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
                                        lg:min-w-70
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

                                    {/* JOINING TYPE */}
                                    <select
                                        value={selectedJoiningType}
                                        onChange={(e) =>
                                            setSelectedJoiningType(
                                                e.target.value
                                            )
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
                                    "
                                    >
                                        <option value="">
                                            Joining Type
                                        </option>

                                        <option value="permanent">
                                            Permanent
                                        </option>

                                        <option value="temporary">
                                            Temporary
                                        </option>

                                        <option value="scrims only">
                                            Scrims Only
                                        </option>
                                    </select>

                                    {/* RESET */}
                                    <button
                                        onClick={() => {
                                            setSelectedRole("");
                                            setSelectedJoiningType("");
                                        }}
                                        className="
                                        border
                                        border-cyan-500
                                        
                                        px-5 py-4
                                        font-semibold
                                        text-black
                                        transition-all
                                        bg-green-500
                                        hover:text-black
                                    "
                                    >
                                        Reset Filters
                                    </button>

                                </div>

                            </div>
                        </div>


                    </>
                )}

                {/* CONTENT */}
                {loading ? (

                    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <PlayerRequestCardSkeleton key={index} />
                        ))}
                    </div>

                ) : playerRequests.length < 1 ? (

                    <NoPlayerRequest />

                ) : filteredRequests.length < 1 ? (

                    <div
                        className="
                        flex
                        min-h-80
                        flex-col
                        items-center
                        justify-center
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
                            No Players Found
                        </h2>

                        <p className="mt-3 max-w-md text-zinc-400">
                            No players match your selected filters.
                            Try changing the role or joining type.
                        </p>

                    </div>

                ) : (

                    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

                        {filteredRequests.map((requests) => (
                            <FindPlayerCard
                                key={requests._id}
                                requests={requests}
                                getTimeAgo={getTimeAgo}
                                getTimeLeft={getTimeLeft}
                            />
                        ))}

                    </div>

                )}

            </div>

        </section>
    );
};



export default FindPlayer;