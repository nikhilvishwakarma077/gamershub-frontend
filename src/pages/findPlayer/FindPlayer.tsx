import { useEffect, useState } from "react";
import { getAllPlayerRequests } from "../../services/playerRequestService";
import PlayerRequestCardSkeleton from "../../components/findPlayer/skeletons/PlayerRequestCardSkeleton";
import PageHeader from "../../components/shared/PageHeader";
import FindPlayerCard from "../../components/findPlayer/FindPlayerCard";
import NoPlayerRequest from "../../components/findPlayer/notFound/NoPlayerRequest";
import type { PlayerRequestData } from "../../types/findPlayer.types";


const FindPlayer = () => {

    const [playerRequests, setPlayerRequests] = useState<PlayerRequestData[]>([])
    const [loading, setLoading] = useState(false)

    const [selectedRole, setSelectedRole] = useState("");
    const [selectedJoiningType, setSelectedJoiningType] = useState("");

    const filteredRequests = playerRequests.filter((request) => {

        const roleMatch =
            !selectedRole ||
            request.role === selectedRole;

        const joiningTypeMatch =
            !selectedJoiningType ||
            request.joiningType === selectedJoiningType;

        return roleMatch && joiningTypeMatch;
    });


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

    const fetchAllPlayerRequests = async () => {
        try {
            setLoading(true)
            const res = await getAllPlayerRequests()
            setPlayerRequests(res.playerRequests)

            setLoading(false)
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {

        fetchAllPlayerRequests()

    }, [])


    return (
        <section className="min-h-screen bg-[#050816] px-4 py-10 text-white">

            <div className="mx-auto max-w-7xl">

                {/* HEADER */}

                {
                    playerRequests.length >= 1 && (
                        <>
                            <PageHeader
                                title="Find"
                                highlight="Players"
                                subtitle="Recruit teammates for ranked, scrims, and esports."
                            />
                      
                            <div className="mb-8 py-10 flex flex-col gap-4 lg:flex-row">
               

                                {/* ROLE FILTER */}
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

                                {/* JOINING TYPE FILTER */}
                                <select
                                    value={selectedJoiningType}
                                    onChange={(e) =>
                                        setSelectedJoiningType(e.target.value)
                                    }
                                    className="
        rounded-2xl border border-zinc-800
        bg-zinc-900
        px-5 py-4
        text-zinc-300
        outline-none
        focus:border-cyan-400
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

                                {/* RESET FILTER */}
                                <button
                                    onClick={() => {
                                        setSelectedRole("");
                                        setSelectedJoiningType("");
                                    }}
                                    className="
        cursor-pointer rounded-lg
        bg-green-500
        px-4 py-2
        text-sm font-medium text-white
    "
                                >
                                    Reset Filter
                                </button>
                            </div>

                        </>
                    )
                }


                {/* REQUESTS GRID */}
                {loading ? (


                    <div className="grid gap-5 sm:grid-cols-2 2xl:grid-cols-3">

                        {Array.from({ length: 6 }).map((_, index) => (
                            <PlayerRequestCardSkeleton key={index} />
                        ))}

                    </div>

                ) : playerRequests.length < 1 ? (
                    <NoPlayerRequest />
                ) : filteredRequests.length < 1 ? (

                    <div
                        className="
                flex min-h-75 flex-col
                items-center justify-center
                rounded-xl border border-zinc-800
                bg-zinc-900/40
                text-center
            "
                    >

                        <h2 className="text-2xl font-bold text-white">
                            No Players Found
                        </h2>

                        <p className="mt-2 text-zinc-400">
                            Try changing your filters
                        </p>

                    </div>

                ) : (

                    <div className="grid gap-5 sm:grid-cols-2 2xl:grid-cols-3">

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