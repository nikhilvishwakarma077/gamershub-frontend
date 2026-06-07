import { useState } from "react";

import {

    Clock3,
    Languages,
    TimerReset,
    Crosshair,
} from "lucide-react";
import { createPlayerRequest } from "../../services/playerRequestService";
import { useNavigate } from "react-router-dom";
import type { CreatePlayerRequestPayload, PlayerRequestFormData } from "../../types/findPlayer.types";



const CreatePlayerRequest = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState<PlayerRequestFormData>({
        role: "",
        joiningType: "permanent",
        activeTime: "",
        languagesComfortable: [] as string[],
        instagram: "",
        expiresAt: "12",
    });


    const languagesList = [
        "English",
        "Hindi",
        "Marathi",
        "Tamil",
        "Telugu",
        "Gujarati",
    ];

    const toggleLanguage = (lang: string) => {

        const exists =
            formData.languagesComfortable.includes(lang);

        setFormData({
            ...formData,

            languagesComfortable: exists
                ? formData.languagesComfortable.filter(
                    (item) => item !== lang
                )
                : [
                    ...formData.languagesComfortable,
                    lang,
                ],
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        try {
            const finalFormData: CreatePlayerRequestPayload = {

                ...formData,
                expiresAt: new Date(
                    Date.now() +
                    Number(formData.expiresAt) * 60 * 60 * 1000
                )
            };

            const res = await createPlayerRequest(finalFormData)
            console.log(res);


            navigate("/my-requests")

        } catch (error) {
            console.log(error)
        }
    };
    return (
        <section className="min-h-screen bg-[#050816] px-4 py-10 text-white">

            <div
                className="
                    mx-auto
                    max-w-3xl
                    rounded-xl
                    border border-cyan-400/10
                    bg-[#0b1120]
                    p-6 sm:p-8
                "
            >

                {/* HEADER */}
                <div className="mb-10">

                    <h1 className="text-3xl font-bold tracking-wide sm:text-4xl">
                        Create <span className="text-cyan-400">Player Request</span>
                    </h1>

                    <p className="mt-2 text-sm text-zinc-400">
                        Find teammates for ranked, scrims, or esports.
                    </p>
                </div>

                {/* FORM */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-8"
                >

                    {/* ROLE */}
                    <div>

                        <label
                            className="
            mb-3 flex items-center gap-2
            text-sm font-medium text-cyan-300
        "
                        >
                            <Crosshair size={18} />

                            Preferred Role
                        </label>

                        <select
                            value={formData.role}
                            required
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    role: e.target.value,
                                })
                            }
                            className="
            w-full rounded-md
            border border-cyan-400/10
            bg-[#09111f]
            px-4 py-3
            outline-none
            focus:border-cyan-400
        "
                        >

                            <option value="">
                                Select Role
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

                    {/* JOINING TYPE */}
                    <div>

                        <label className="mb-3 block text-sm font-medium text-cyan-300">
                            Joining Type
                        </label>

                        <div className="grid gap-4 sm:grid-cols-3">

                            {([
                                "permanent",
                                "temporary",
                                "scrims only",
                            ] as const).map((type) => (

                                <button
                                    key={type}
                                    type="button"
                                    onClick={() =>
                                        setFormData({
                                            ...formData,
                                            joiningType: type,
                                        })
                                    }
                                    className={`
                                        rounded-md border px-4 py-3 text-sm capitalize transition-all

                                        ${formData.joiningType === type
                                            ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                                            : "border-cyan-400/10 bg-[#09111f] text-zinc-400"
                                        }
                                    `}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ACTIVE TIME */}
                    <div>

                        <label
                            className="
                                mb-3 flex items-center gap-2
                                text-sm font-medium text-cyan-300
                            "
                        >
                            <Clock3 size={18} />

                            Active Time
                        </label>

                        <input
                            type="text"
                            required
                            placeholder="Eg: 12PM to 2PM, 9PM to 11PM "
                            value={formData.activeTime}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    activeTime: e.target.value,
                                })
                            }
                            className="
                                w-full rounded-md
                                border border-cyan-400/10
                                bg-[#09111f]
                                px-4 py-3
                                outline-none
                                placeholder:text-zinc-500
                                focus:border-cyan-400
                            "
                        />
                    </div>

                    {/* LANGUAGES */}
                    <div>
                        <label
                            className="
                                mb-4 flex items-center gap-2
                                text-sm font-medium text-cyan-300
                            "
                        >
                            <Languages size={18} />

                            Preferred Languages
                        </label>

                        <input
                            type="text"
                            required
                            value={formData.languagesComfortable.join(",")}
                            onChange={() => { }}
                            className="absolute opacity-0
                            h-px w-px"
                        />

                        <div className="flex flex-wrap gap-3">
                            {languagesList.map((language) => (
                                <button
                                    key={language}
                                    type="button"
                                    onClick={() =>
                                        toggleLanguage(language)
                                    }
                                    className={`rounded-md border px-4 py-2 text-sm transition

                ${formData.languagesComfortable.includes(language)
                                            ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                                            : "border-zinc-700 bg-[#111827] text-zinc-300"
                                        }
                `}
                                >
                                    {language}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* CONTACT */}
                    <div className="grid gap-6 sm:grid-cols-2">

                        {/* INSTAGRAM */}
                        <div>

                            <label
                                className="
                                    mb-3 flex items-center gap-2
                                    text-sm font-medium text-cyan-300
                                "
                            >
                                {/* <Instagram size={18} /> */}

                                Instagram ID
                            </label>

                            <input
                                type="text"
                                required
                                placeholder="your insta id"
                                value={formData.instagram}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        instagram: e.target.value,
                                    })
                                }
                                className="
                                    w-full rounded-md
                                    border border-cyan-400/10
                                    bg-[#09111f]
                                    px-4 py-3
                                    outline-none
                                    placeholder:text-zinc-500
                                    focus:border-cyan-400
                                "
                            />
                        </div>

                  

                    </div>

                    {/* EXPIRY */}
                    <div>

                        <label
                            className="
                                mb-3 flex items-center gap-2
                                text-sm font-medium text-cyan-300
                            "
                        >
                            <TimerReset size={18} />

                            Auto Delete After
                        </label>

                        <select
                            value={formData.expiresAt}
                            required
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    expiresAt: e.target.value,
                                })
                            }
                            className="
                                w-full rounded-md
                                border border-cyan-400/10
                                bg-[#09111f]
                                px-4 py-3
                                outline-none
                                focus:border-cyan-400
                            "
                        >
                            <option value="6">
                                6 Hours
                            </option>

                            <option value="12">
                                12 Hours
                            </option>

                            <option value="24">
                                24 Hours
                            </option>

                            <option value="48">
                                48 Hours
                            </option>
                        </select>
                    </div>

                    {/* SUBMIT */}
                    <button
                        type="submit"
                        className="
                            w-full rounded-md
                            bg-cyan-400
                            px-6 py-4
                            text-sm font-semibold uppercase tracking-wide
                            text-black
                            transition-all hover:bg-cyan-300
                        "
                    >
                        Create
                    </button>
                </form>
            </div>
        </section>
    );
};

export default CreatePlayerRequest;