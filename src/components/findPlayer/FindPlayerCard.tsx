import {
    CalendarDays,
    Clock3,
    Languages,
    TimerReset,
} from "lucide-react";
import { Link } from "react-router-dom";

type FindPlayerCardProps = {
    requests: any;
    getTimeAgo: (date: string) => string;
    getTimeLeft: (date: string) => string;
};

const FindPlayerCard = ({
    requests,
    getTimeAgo,
    getTimeLeft,
}: FindPlayerCardProps) => {

    return (
        <div
            className="
        overflow-hidden
        rounded-2xl
        border border-cyan-950
        bg-zinc-900
      "
        >

            {/* TOP */}
            <div className="border-b border-cyan-950 p-4 sm:p-5">

                {/* USER + TIME */}
                <div
                    className="
            flex flex-col gap-4
            xs:flex-row
            xs:items-start
            xs:justify-between
          "
                >

                    {/* USER */}
                    <div className="flex min-w-0 items-center gap-3">

                        <div
                            className="
                flex h-11 w-11 shrink-0
                items-center justify-center
                rounded-full
                bg-cyan-950
                text-sm font-semibold text-cyan-300
                sm:h-12 sm:w-12
              "
                        >
                            {requests.userId.username.slice(0, 2)}
                        </div>

                        <div className="min-w-0">

                            <h2
                                className="
                  truncate
                  text-base font-semibold text-white
                  sm:text-lg
                "
                            >
                                {requests.userId.username}
                            </h2>

                            <p
                                className="
                  truncate
                  text-xs text-zinc-400
                  sm:text-sm
                "
                            >
                                {requests.instagram}
                            </p>
                        </div>
                    </div>

                    <p className="text-[11px] text-zinc-500 sm:text-xs">
                        {getTimeAgo(requests.createdAt)}
                    </p>
                </div>

                {/* ROLE + JOIN TYPE */}
                <div className="mt-5 flex items-center justify-between">

                    <div>

                        <p className="text-[11px] uppercase tracking-wider text-zinc-500">
                            Slot open For
                        </p>

                        <h3 className="mt-1 text-xl font-semibold capitalize text-cyan-300">
                            {requests.role}
                        </h3>
                    </div>

                    <div
                        className=""
                    >

                        <div className="flex items-center gap-2 text-zinc-500">

                            <CalendarDays size={14} />

                            <p className="text-[10px] uppercase tracking-wider">
                                Joining Type
                            </p>
                        </div>

                        <h3
                            className={`mt-2 rounded p-1 text-xl font-medium capitalize text-white ${requests.joiningType === "permanent"
                                ? "bg-green-600"
                                : requests.joiningType === "temporary"
                                    ? "bg-yellow-600"
                                    : "bg-cyan-600"
                                }`}
                        >
                            {requests.joiningType}
                        </h3>
                    </div>
                </div>
            </div>

            {/* CONTENT */}
            <div className="space-y-4 p-4 sm:p-5">

                {/* ACTIVE TIME */}
                <div
                    className="
            rounded-xl
            border border-zinc-800
            bg-zinc-950
            p-4
          "
                >

                    <div className="flex items-center gap-2 text-zinc-500">

                        <Clock3 size={14} />

                        <p className="text-[10px] uppercase tracking-wider">
                            Active Time
                        </p>
                    </div>

                    <h3
                        className="
              mt-2
              wrap-break-word
              text-sm font-medium text-white
            "
                    >
                        {requests.activeTime}
                    </h3>
                </div>

                {/* LANGUAGES */}
                <div
                    className="
            rounded-xl
            border border-zinc-800
            bg-zinc-950
            p-4
          "
                >

                    <div className="flex items-center gap-2 text-zinc-500">

                        <Languages size={14} />

                        <p className="text-[10px] uppercase tracking-wider">
                            Preferred Languages
                        </p>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">

                        {requests.languagesComfortable.map(
                            (lang: string, index: number) => (
                                <span
                                    key={index}
                                    className="
                    rounded-md
                    bg-cyan-950
                    px-2.5 py-1.5
                    text-[11px]
                    text-cyan-300
                    sm:px-3
                    sm:text-xs
                  "
                                >
                                    {lang}
                                </span>
                            )
                        )}
                    </div>
                </div>

                {/* ACTION BUTTONS */}
                <div
                    className="
            flex flex-col gap-3
            border-t border-zinc-800
            pt-4
            sm:flex-row
          "
                >

                    <a
                        href={`https://www.instagram.com/${requests.instagram}`}
                        target="_blank"
                        rel="noreferrer"
                        className="
              w-full
              rounded-lg
              bg-cyan-500
              px-4 py-3
              text-center
              text-sm font-medium text-white
            "
                    >
                        DM To Player
                    </a>

                    <Link

                        to={`/profile/${requests.profileId}`}
                        className="
              w-full
              rounded-lg
              border border-zinc-700
              bg-zinc-800
              px-4 py-3
              text-center
              text-sm font-medium text-white
            "

                    >
                        View Profile
                    </Link>
                </div>

                {/* FOOTER */}
                <div
                    className="
                        flex items-center justify-between
                        border-t border-zinc-800
                        pt-4
                    "
                >

                    <div className="flex items-center gap-2 text-red-300">

                        <TimerReset size={15} />

                        <p className="text-sm font-medium">
                            {getTimeLeft(requests.expiresAt)}
                        </p>
                    </div>

                    <a
                        href={requests.profileLink} target="_blank"
                        className="
                            rounded-lg
                            bg-green-500
                            px-4 py-2
                            text-sm font-medium text-white
                            cursor-pointer"
                    >
                        Contact Player
                    </a>
                </div>
            </div>
        </div>
    );
};

export default FindPlayerCard;