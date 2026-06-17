import { Clock3, Languages, TimerReset } from "lucide-react";

type PlayerRequestCardProps = {
    requests: any;
    getTimeAgo: (date: string) => string;
    getTimeLeft: (date: string) => string;
    handleDelete: (id: string) => void;
};

const MyPlayerRequestCard = ({
    requests,
    getTimeAgo,
    getTimeLeft,
    handleDelete,
}: PlayerRequestCardProps) => {
    return (
        <div
            className="group overflow-hidden border border-zinc-800 bg-[#0b1120] transition-all duration-300 hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(6,182,212,0.08)]"
        >
            {/* TOP ACCENT */}
            <div className="h-1 bg-linear-to-r from-transparent via-cyan-400 to-transparent opacity-80" />

            {/* HEADER */}
            <div className="border-b border-zinc-800 p-4">

                {/* USER + TIME */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

                    <div className="flex min-w-0 items-center gap-3">

                        <img src={`/avatars/${requests.profileId.avatar}`}
                            onError={(e) => {
                                e.currentTarget.src =
                                    "https://cdn-icons-png.flaticon.com/512/149/149071.png";
                            }}
                            className="flex h-11 w-11 shrink-0 rounded-full items-center justify-center border border-cyan-500 bg-cyan-500/10 text-sm font-bold text-cyan-300"
                        />

                        <div className="min-w-0">

                            <h2 className="truncate text-base font-bold text-white">
                                {requests.profileId.username}
                            </h2>

                            <p className="truncate text-xs text-zinc-500">
                                @{requests.instagram}
                            </p>

                        </div>
                    </div>

                    <p className="shrink-0 text-[11px] text-zinc-500">
                        {getTimeAgo(requests.createdAt)}
                    </p>

                </div>

                {/* ROLE + JOIN TYPE */}
                <div className="mt-5 flex items-start justify-between gap-4">

                    <div>

                        <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                            Need
                        </p>

                        <h3 className="mt-2 text-lg font-black uppercase text-cyan-300">
                            {requests.role}
                        </h3>

                    </div>

                    <div className="text-right">

                        <div className=" text-zinc-500">

                            <p className="text-[10px] uppercase tracking-wider">
                                Joining Type
                            </p>

                        </div>

                        <span
                            className={`mt-2 inline-flex border px-3 py-1.5 text-xs font-semibold uppercase tracking-wider
                            ${requests.joiningType === "permanent"
                                    ? "border-green-500/30 bg-green-500/10 text-green-300"
                                    : requests.joiningType === "temporary"
                                        ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-300"
                                        : "border-cyan-500/30 bg-cyan-500/10 text-cyan-300"
                                }
                        `}
                        >
                            {requests.joiningType}
                        </span>

                    </div>

                </div>

            </div>

            {/* BODY */}
            <div className="space-y-3 p-4">

                {/* ACTIVE TIME */}
                <div className="border border-zinc-800 bg-[#09111f] p-3">

                    <div className="flex items-center gap-2 text-zinc-500">

                        <Clock3 size={14} />

                        <p className="text-[10px] uppercase tracking-wider">
                            Active Time
                        </p>

                    </div>

                    <p className="mt-2 text-sm text-white">
                        {requests.activeTime}
                    </p>

                </div>

                {/* LANGUAGES */}
                <div className="border border-zinc-800 bg-[#09111f] p-3">

                    <div className="flex items-center gap-2 text-zinc-500">

                        <Languages size={14} />

                        <p className="text-[10px] uppercase tracking-wider">
                            Languages comfortable with
                        </p>

                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">

                        {requests.languagesComfortable.map(
                            (lang: string, index: number) => (
                                <span
                                    key={index}
                                    className="border border-cyan-500/20   bg-cyan-500/10 px-2 py-1 text-[11px]  text-cyan-300 "
                                >
                                    {lang}
                                </span>
                            )
                        )}

                    </div>

                </div>

                {/* EXPIRES */}
                <div className="flex items-center gap-2 border border-red-500/20 bg-red-500/5 p-3 text-red-300">

                    <TimerReset size={15} />

                    <p className="text-sm font-medium">
                        {getTimeLeft(requests.expiresAt)}
                    </p>

                </div>

            </div>

            {/* ACTIONS */}
            <div className="border-t border-zinc-800 p-4">

                <div className="flex flex-col gap-3 md:flex-row  items-center justify-center">

                    <a
                        href={`https://www.instagram.com/${requests.instagram}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex w-full items-center justify-center border border-cyan-500 bg-cyan-500/10  px-4  py-3 text-sm  font-semibold  text-cyan-300 transition-all hover:bg-cyan-500 hover:text-black"
                    >
                        DM Player
                    </a>


                    <button
                        onClick={() => {
                            handleDelete(requests._id);
                        }}
                        className="flex w-full items-center justify-center border border-red-500/40
                        px-4 py-3 text-sm font-semibold text-black transition-all bg-red-500 hover:text-white"
                    >
                        Delete
                    </button>

                </div>

            </div>
        </div>
    );
};

export default MyPlayerRequestCard;