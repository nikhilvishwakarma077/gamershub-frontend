import { Plus, } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteMyPlayerRequestById, getMyPlayerRequests } from "../../services/playerRequestService";
import PlayerRequestCardSkeleton from "../../components/findPlayer/skeletons/PlayerRequestCardSkeleton";
import NoPlayerRequest from "../../components/findPlayer/notFound/NoPlayerRequest";
import MyPlayerRequestCard from "../../components/findPlayer/MyPlayerRequestCard";
import type { MyPlayerRequestData } from "../../types/findPlayer.types";

const MyPlayerRequests = () => {

    const [myPlayerRequests, setMyPlayerRequests] = useState<MyPlayerRequestData[]>([])
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

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
    };

    const fetchMyPlayerRequests = async () => {
        try {
            setLoading(true)
            const res = await getMyPlayerRequests()
            setMyPlayerRequests(res.playerRequests)
       
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

        fetchMyPlayerRequests()

    }, [])

    const handleDelete = async (requestId: string) => {

        try {
            const res = await deleteMyPlayerRequestById(requestId)
            console.log(res)

            fetchMyPlayerRequests()


        } catch (error) {
            console.log(error)
        }
    }


    return (
        <section className="min-h-screen bg-[#050816] px-4 py-10 text-white">

            <div className="mx-auto max-w-7xl">

                {/* HEADER */}

                {
                    myPlayerRequests.length >= 1 && (
                        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                            {/* LEFT */}
                            <div>

                                <h1 className="text-3xl font-bold tracking-wide sm:text-4xl">
                                    My <span className="text-cyan-400">Requests</span>
                                </h1>

                                <p className="mt-2 max-w-xl text-sm text-zinc-400">
                                    Manage your recruitment posts and connect with skilled players.
                                </p>

                            </div>


                            {/* RIGHT */}
                            <button
                                onClick={() => {
                                    navigate("/create-request");
                                }}
                                className="
      flex items-center justify-center gap-2
      rounded-lg bg-cyan-400
      px-5 py-3
      font-medium text-black
      transition hover:opacity-90
      sm:w-auto
    "
                            >
                                Create Request

                                <Plus size={16} />
                            </button>

                        </div>
                    )}

                {/* TEAM REQUEST GRID */}
                {
                    loading ? (
                        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

                            {Array.from({ length: 6 }).map((_, index) => (
                                <PlayerRequestCardSkeleton key={index} />
                            ))}

                        </div>
                    ) : myPlayerRequests.length < 1 ? (

                        <NoPlayerRequest />

                    ) : (

                        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

                            {myPlayerRequests.map((requests) => (
                                <MyPlayerRequestCard
                                    key={requests._id}
                                    requests={requests}
                                    getTimeAgo={getTimeAgo}
                                    getTimeLeft={getTimeLeft}
                                    handleDelete={handleDelete}
                                />
                            ))}

                        </div>
                    )
                }
            </div>
        </section>
    );
};

export default MyPlayerRequests;