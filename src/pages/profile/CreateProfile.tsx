import { useState } from "react";
import { createProfile } from "../../services/profileService";
import { useNavigate } from "react-router-dom";
import type { CreateProfileData, CreateProfilePayload } from "../../types/profile.types";

import {
    avatarOptions,
    bannerOptions,
} from "../../common/utils/profileImages";
import { toast } from "react-toastify";

const languagesList = [
    "English",
    "Hindi",
    "Marathi",
    "Tamil",
    "Telugu",
    "Gujarati",
];

const availabilityOptions = [
    "looking for team",
    "open for scrims",
    "already in team",
];

const CreateProfile = () => {

    const [formData, setFormData] =
        useState<CreateProfileData>({
            username: "",

            uid: "",

            age: "",

            avatar: "avatar1.webp",

            banner: "banner1.webp",

            bio: "",

            country: "",

            languages: [],

            role: "",
            socialLinks: {
                instagram: "",
                discord: "",
            },
            stats: {
                currentRank: "",

                kdRatio: "",

                headshotPercentage: "",
            },

            experience: {
                level: "",

                yearsPlaying: "",

                esportsExperience: "",
            },

            availability: {
                status: "Looking for a Team",
            },

            clips: [
                {
                    title: "",

                    clipUrl:
                        "",

                    thumbnailUrl:
                        "",
                },
            ],

            teamHistory: [
                {
                    teamName: "",

                    role: "",

                    duration: "",
                },
            ],

            achievements: [
                {
                    title: "",

                    image: "",
                },
            ],
        });

    const [showAvatars, setShowAvatars] = useState(false);
    const [showBanners, setShowBanners] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);



    const navigate = useNavigate()

    const toggleLanguage = (language: string) => {

        const alreadySelected =
            formData.languages.includes(language);

        setFormData({
            ...formData,

            languages: alreadySelected
                ? formData.languages.filter(
                    (item) => item !== language
                )
                : [...formData.languages, language],
        });
    };



    // ARRAY CHANGE
    const handleArrayChange = (
        section: string,
        index: number,
        field: string,
        value: string
    ) => {
        const updatedArray = [...(formData as any)[section]];

        updatedArray[index][field] = value;

        setFormData((prev: any) => ({
            ...prev,
            [section]: updatedArray,
        }));
    };

    const removeItem = (
        section: string,
        index: number
    ) => {

        const updatedArray = [...(formData as any)[section]];

        updatedArray.splice(index, 1);

        setFormData((prev: any) => ({
            ...prev,
            [section]: updatedArray,
        }));
    };

    // ADD ITEM
    const addItem = (section: string, item: any) => {
        setFormData((prev: any) => ({
            ...prev,
            [section]: [...prev[section], item],
        }));
    };

   const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
        const finalData: CreateProfilePayload = {
            ...formData,

            uid: Number(formData.uid),

            age: Number(formData.age),

            stats: {
                ...formData.stats,

                kdRatio: Number(formData.stats.kdRatio),

                headshotPercentage: Number(
                    formData.stats.headshotPercentage
                ),
            },

            experience: {
                ...formData.experience,

                level: Number(formData.experience.level),

                yearsPlaying: Number(
                    formData.experience.yearsPlaying
                ),

                esportsExperience: Number(
                    formData.experience.esportsExperience
                ),
            },
        };

        const res = await createProfile(finalData);

        toast.success(
            res?.message || "Profile created successfully"
        );

        // Agar profile page pe bhejna hai:
        navigate("/my-profile");

    } catch (error: any) {
        toast.error(
            error?.response?.data?.message ||
            "Failed to create profile"
        );

        console.error(error);
    } finally {
        setIsSubmitting(false);
    }
};

    return (
        <section className="min-h-screen bg-[#050816] px-4 py-20 text-white">
            <div className="mx-auto max-w-6xl rounded-xl border border-zinc-800 bg-[#0b1120] p-6">
                <div className="mb-8 flex items-center justify-between">
                    <div>

                        <h1 className="text-3xl font-bold tracking-wide ">
                            Create Your<span className="text-cyan-400">Profile</span>
                        </h1>

                        <p className="mt-1 text-zinc-400">
                            Showcase your skills, achievements, and gaming experience.
                        </p>
                    </div>

                    <button
                        onClick={() => navigate(-1)}
                        className="rounded-lg border border-zinc-700 bg-[#0b1120] px-4 py-2"
                    >
                        Back
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-10"
                >

                    {/* BASIC INFO */}
                    <div>
                        <h2 className="mb-5 text-xl font-semibold text-cyan-400">
                            Basic Information
                        </h2>

                        <div className="grid gap-5 md:grid-cols-2">

                            {/* Username */}
                            <div>
                                <label className="mb-2 block text-sm text-zinc-300">
                                    Username
                                    <span className="ml-1 text-red-400">*</span>
                                </label>

                                <input
                                    type="text"
                                    required
                                    placeholder="Username"
                                    value={formData.username}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            username: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-md border border-zinc-700 bg-[#111827] px-4 py-3 outline-none"
                                />
                            </div>

                            {/* UID */}
                            <div>
                                <label className="mb-2 block text-sm text-zinc-300">
                                    UID
                                    <span className="ml-1 text-red-400">*</span>
                                </label>

                                <input
                                    type="text"
                                    required
                                    inputMode="numeric"
                                    placeholder="Your UID"
                                    value={formData.uid}
                                    onChange={(e) => {

                                        const value = e.target.value;

                                        if (/^\d*$/.test(value)) {
                                            setFormData({
                                                ...formData,
                                                uid: value,
                                            });
                                        }
                                    }}
                                    className="w-full rounded-md border border-zinc-700 bg-[#111827] px-4 py-3 outline-none"
                                />
                            </div>

                            {/* Age */}
                            <div>
                                <label className="mb-2 block text-sm text-zinc-300">
                                    Age
                                    <span className="ml-1 text-red-400">*</span>
                                </label>

                                <input
                                    type="text"
                                    required
                                    inputMode="numeric"
                                    placeholder="Age"
                                    value={formData.age}
                                    onChange={(e) => {

                                        const value = e.target.value;

                                        // only 1-99 allowed
                                        if (/^(|[1-9][0-9]?)$/.test(value)) {
                                            setFormData({
                                                ...formData,
                                                age: value,
                                            });
                                        }
                                    }}
                                    className="w-full rounded-md border border-zinc-700 bg-[#111827] px-4 py-3 outline-none"
                                />
                            </div>

                            {/* Country */}
                            <div>
                                <label className="mb-2 block text-sm text-zinc-300">
                                    Country
                                    <span className="ml-1 text-red-400">*</span>
                                </label>

                                <input
                                    type="text"
                                    required
                                    placeholder="State, Country"
                                    value={formData.country}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            country: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-md border border-zinc-700 bg-[#111827] px-4 py-3 outline-none"
                                />
                            </div>

                            {/* Avatar */}
                            <div className="rounded-xl border border-zinc-800 bg-[#0b1120] p-6">

                                <div
                                    onClick={() => setShowAvatars(!showAvatars)}
                                    className="flex cursor-pointer items-center justify-between"
                                >
                                    <h2 className="text-xl font-semibold text-cyan-400">
                                        Select Avatar
                                    </h2>

                                    <button
                                        type="button"
                                        className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300"
                                    >
                                        {showAvatars ? "Hide" : "Change"}
                                    </button>
                                </div>

                                {/* CURRENT AVATAR */}
                                <div className="mt-5 flex items-center gap-4">

                                    <img
                                        src={`/avatars/${formData.avatar}`}
                                        alt="selected-avatar"
                                        className="h-24 w-24 rounded-xl border border-cyan-400 object-cover"
                                    />

                                    <div>
                                        <p className="text-sm text-zinc-400">
                                            Current Avatar
                                        </p>

                                        <p className="text-white">
                                            Choose an avatar that represents your gaming identity.
                                        </p>
                                    </div>
                                </div>

                                {/* AVATAR OPTIONS */}
                                {showAvatars && (
                                    <div className="mt-6 grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5">

                                        {avatarOptions.map((avatar) => (

                                            <button
                                                key={avatar}
                                                type="button"
                                                onClick={() => {
                                                    setFormData({
                                                        ...formData,
                                                        avatar,
                                                    });

                                                    setShowAvatars(false);
                                                }}
                                            >
                                                <img
                                                    src={`/avatars/${avatar}`}
                                                    alt={avatar}
                                                    className={`
                            h-24 w-24 rounded-xl border-2 object-cover
                            transition-all duration-200

                            ${formData.avatar === avatar
                                                            ? "scale-105 border-cyan-400"
                                                            : "border-zinc-700 opacity-80 hover:opacity-100"
                                                        }
                        `}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                )}

                            </div>

                            {/* Banner */}
                            <div className="mt-6 rounded-xl border border-zinc-800 bg-[#0b1120] p-6">

                                <div
                                    onClick={() => setShowBanners(!showBanners)}
                                    className="flex cursor-pointer items-center justify-between"
                                >
                                    <h2 className="text-xl font-semibold text-cyan-400">
                                        Select Banner
                                    </h2>

                                    <button
                                        type="button"
                                        className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300"
                                    >
                                        {showBanners ? "Hide" : "Change"}
                                    </button>
                                </div>

                                {/* CURRENT BANNER */}
                                <div className="mt-5">

                                    <img
                                        src={`/banners/${formData.banner}`}
                                        alt="selected-banner"
                                        className="h-40 w-full rounded-xl border border-cyan-400 object-cover"
                                    />

                                    <p className="mt-3 text-sm text-zinc-400">
                                        This banner will appear at the top of your profile.
                                    </p>

                                </div>

                                {/* BANNER OPTIONS */}
                                {showBanners && (
                                    <div className="mt-6 grid gap-4">

                                        {bannerOptions.map((banner) => (

                                            <button
                                                key={banner}
                                                type="button"
                                                onClick={() => {
                                                    setFormData({
                                                        ...formData,
                                                        banner,
                                                    });

                                                    setShowBanners(false);
                                                }}
                                            >
                                                <img
                                                    src={`/banners/${banner}`}
                                                    alt={banner}
                                                    className={`
                            h-32 w-full rounded-xl border-2 object-cover
                            transition-all duration-200

                            ${formData.banner === banner
                                                            ? "border-cyan-400"
                                                            : "border-zinc-700 opacity-80 hover:opacity-100"
                                                        }
                        `}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                )}

                            </div>

                            {/* Instagram */}
                            <div>
                                <label className="mb-2 block text-sm text-zinc-300">
                                    Instagram URL<span className="ml-1 text-red-400">*</span>
                                </label>

                                <input
                                    type="text"
                                    required
                                    placeholder="Instagram URL"
                                    value={formData.socialLinks.instagram}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,

                                            socialLinks: {
                                                ...formData.socialLinks,
                                                instagram: e.target.value,
                                            },
                                        })
                                    }
                                    className="
            w-full rounded-md
            border border-zinc-700
            bg-[#111827]
            px-4 py-3
            outline-none
        "
                                />
                            </div>

                            {/* Discord */}
                            <div>
                                <label className="mb-2 block text-sm text-zinc-300">
                                    Discord URL
                                </label>

                                <input
                                    type="text"
                                    placeholder="Discord URL"
                                    value={formData.socialLinks.discord}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,

                                            socialLinks: {
                                                ...formData.socialLinks,
                                                discord: e.target.value,
                                            },
                                        })
                                    }
                                    className="
            w-full rounded-md
            border border-zinc-700
            bg-[#111827]
            px-4 py-3
            outline-none
        "
                                />
                            </div>

                            {/* Role */}
                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm text-zinc-300">
                                    Role
                                    <span className="ml-1 text-red-400">*</span>
                                </label>

                                <div>

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
            w-full rounded-lg 
            border border-zinc-700
            bg-[#111827]
           p-3
            outline-none
            
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
                            </div>

                            {/* Bio */}
                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm text-zinc-300">
                                    Bio
                                </label>

                                <textarea
                                    placeholder="Bio"
                                    rows={4}
                                    value={formData.bio}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            bio: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-md border border-zinc-700 bg-[#111827] px-4 py-3 outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* LANGUAGES */}
                    <div>
                        <h2 className="mb-5 text-xl font-semibold text-cyan-400">
                            Languages<span className="ml-1 text-red-400">*</span>
                        </h2>

                        <input
                            type="text"
                            required
                            value={formData.languages.join(",")}
                            onChange={() => { }}
                            className="absolute opacity-0
                            h-px w-px
"
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

                ${formData.languages.includes(language)
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

                    {/* STATS */}
                    <div>
                        <h2 className="mb-5 text-xl font-semibold text-cyan-400">
                            Current BR Stats
                        </h2>

                        <div className="grid gap-5 md:grid-cols-3">

                            <input
                                type="text"
                                placeholder="Current Rank"
                                value={formData.stats.currentRank}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        stats: {
                                            ...formData.stats,
                                            currentRank:
                                                e.target.value,
                                        },
                                    })
                                }
                                className="rounded-md border border-zinc-700 bg-[#111827] px-4 py-3 outline-none"
                            />

                            <input
                                type="text"
                                inputMode="decimal"
                                placeholder="KD Ratio"
                                value={formData.stats.kdRatio}
                                onChange={(e) => {

                                    const value = e.target.value;

                                    // allowed:
                                    // 1
                                    // 1.1
                                    // 11.1
                                    // 1.11
                                    // 11.11

                                    if (/^\d{0,2}(\.\d{0,2})?$/.test(value)) {
                                        setFormData({
                                            ...formData,

                                            stats: {
                                                ...formData.stats,
                                                kdRatio: value,
                                            },
                                        });
                                    }
                                }}
                                className="rounded-md border border-zinc-700 bg-[#111827] px-4 py-3 outline-none"
                            />

                            <input
                                type="text"
                                inputMode="decimal"
                                placeholder="Headshot Percentage"
                                value={
                                    formData.stats.headshotPercentage
                                }
                                onChange={(e) => {

                                    const value = e.target.value;

                                    // allowed:
                                    // 1
                                    // 11
                                    // 1.1
                                    // 11.1
                                    // 1.11
                                    // 11.11

                                    if (/^\d{0,2}(\.\d{0,2})?$/.test(value)) {
                                        setFormData({
                                            ...formData,

                                            stats: {
                                                ...formData.stats,
                                                headshotPercentage: value,
                                            },
                                        });
                                    }
                                }}
                                className="rounded-md border border-zinc-700 bg-[#111827] px-4 py-3 outline-none"
                            />
                        </div>
                    </div>

                    {/* EXPERIENCE */}
                    <div>
                        <h2 className="mb-5 text-xl font-semibold text-cyan-400">
                            Experience<span className="ml-1 text-red-400">*</span>
                        </h2>

                        <div className="grid gap-5 md:grid-cols-3">

                            {/* Level */}
                            <input
                                type="text"
                                required
                                inputMode="numeric"
                                placeholder="ID Level"
                                value={formData.experience.level}
                                onChange={(e) => {

                                    const value = e.target.value;

                                    // 0 - 99
                                    if (/^\d{0,2}$/.test(value)) {
                                        setFormData({
                                            ...formData,

                                            experience: {
                                                ...formData.experience,
                                                level: value,
                                            },
                                        });
                                    }
                                }}
                                className="rounded-md border border-zinc-700 bg-[#111827] px-4 py-3 outline-none"
                            />

                            {/* Years Playing */}
                            <input
                                type="text"
                                required
                                inputMode="numeric"
                                placeholder="Years Playing"
                                value={
                                    formData.experience.yearsPlaying
                                }
                                onChange={(e) => {

                                    const value = e.target.value;

                                    // 0 - 99
                                    if (/^\d{0,2}$/.test(value)) {
                                        setFormData({
                                            ...formData,

                                            experience: {
                                                ...formData.experience,
                                                yearsPlaying: value,
                                            },
                                        });
                                    }
                                }}
                                className="rounded-md border border-zinc-700 bg-[#111827] px-4 py-3 outline-none"
                            />

                            {/* Esports Experience */}
                            <input
                                type="text"
                                required
                                inputMode="numeric"
                                placeholder="Esports Experience"
                                value={
                                    formData.experience
                                        .esportsExperience
                                }
                                onChange={(e) => {

                                    const value = e.target.value;

                                    // 0 - 99
                                    if (/^\d{0,2}$/.test(value)) {
                                        setFormData({
                                            ...formData,

                                            experience: {
                                                ...formData.experience,
                                                esportsExperience: value,
                                            },
                                        });
                                    }
                                }}
                                className="rounded-md border border-zinc-700 bg-[#111827] px-4 py-3 outline-none"
                            />
                        </div>
                    </div>

                    {/* Availability */}
                    <div>
                        <h2 className="mb-5 text-xl font-semibold text-cyan-400">
                            Availability<span className="ml-1 text-red-400">*</span>
                        </h2>

                        <select
                            required
                            value={formData.availability.status}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    availability: {
                                        status: e.target.value
                                    }
                                })
                            }
                            className="w-full rounded-lg border border-zinc-700 bg-[#111827] px-4 py-3 outline-none"
                        >
                            <option value="">
                                Select Availability
                            </option>

                            {availabilityOptions.map((item) => (
                                <option
                                    key={item}
                                    value={item}
                                >
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Previous Team */}
                    <div className="rounded-xl border border-zinc-800 bg-[#0b1120] p-6">

                        <div className="mb-5 flex items-center justify-between">
                            <h2 className="text-xl font-semibold">
                                Team History <span className="text-sm text-zinc-400">
                                            (Optional)
                                        </span>
                            </h2>

                            <button
                                type="button"
                                onClick={() =>
                                    addItem("teamHistory", {
                                        teamName: "",
                                        role: "",
                                        duration: "",
                                    })
                                }
                                className="rounded-lg bg-cyan-500 px-4 py-2 text-black"
                            >
                                Add Team
                            </button>
                        </div>

                        <div className="space-y-5">

                            {formData.teamHistory.map((team, index) => (

                                <div
                                    key={index}
                                    className="rounded-lg border border-zinc-700 bg-[#09111f] p-4"
                                >

                                    {/* TOP */}
                                    <div className="mb-4 flex items-center justify-between">

                                        <h3 className="text-sm text-zinc-400">
                                            Team #{index + 1}
                                        </h3>

                                        {/* REMOVE BUTTON */}
                                        {formData.teamHistory.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeItem("teamHistory", index)
                                                }
                                                className="flex h-8 w-8 items-center justify-center rounded-md border border-red-500 text-red-400"
                                            >
                                                ✕
                                            </button>
                                        )}
                                    </div>

                                    {/* INPUTS */}
                                    <div className="grid gap-4 md:grid-cols-3">

                                        <input
                                            type="text"
                                            placeholder="Team Name"
                                            value={team.teamName}
                                            onChange={(e) =>
                                                handleArrayChange(
                                                    "teamHistory",
                                                    index,
                                                    "teamName",
                                                    e.target.value
                                                )
                                            }
                                            className="rounded-lg border border-zinc-700 bg-[#0b1120] p-3 outline-none"
                                        />

                                        <input
                                            type="text"
                                            placeholder="Role"
                                            value={team.role}
                                            onChange={(e) =>
                                                handleArrayChange(
                                                    "teamHistory",
                                                    index,
                                                    "role",
                                                    e.target.value
                                                )
                                            }
                                            className="rounded-lg border border-zinc-700 bg-[#0b1120] p-3 outline-none"
                                        />

                                        <input
                                            type="text"
                                            placeholder="Duration"
                                            value={team.duration}
                                            onChange={(e) =>
                                                handleArrayChange(
                                                    "teamHistory",
                                                    index,
                                                    "duration",
                                                    e.target.value
                                                )
                                            }
                                            className="rounded-lg border border-zinc-700 bg-[#0b1120] p-3 outline-none"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Clips */}
                    <div className="rounded-xl border border-zinc-800 bg-[#0b1120] p-6">

                        <div className="mb-5 flex items-center justify-between">
                            <h2 className="text-xl font-semibold">
                                Clips
                            </h2>

                            <button
                                type="button"
                                onClick={() =>
                                    addItem("clips", {
                                        title: "",
                                        clipUrl: "",
                                        thumbnailUrl: "",
                                    })
                                }
                                className="rounded-lg bg-cyan-500 px-4 py-2 text-black"
                            >
                                Add Clip
                            </button>
                        </div>

                        <div className="space-y-5">

                            {formData.clips.map((clip, index) => (

                                <div
                                    key={index}
                                    className="rounded-lg border border-zinc-700 bg-[#09111f] p-4"
                                >

                                    {/* TOP */}
                                    <div className="mb-4 flex items-center justify-between">

                                        <h3 className="text-sm text-zinc-400">
                                            Clip #{index + 1}
                                        </h3>

                                        {/* REMOVE BUTTON */}
                                        {formData.clips.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeItem("clips", index)
                                                }
                                                className="flex h-8 w-8 items-center justify-center rounded-md border border-red-500 text-red-400"
                                            >
                                                ✕
                                            </button>
                                        )}
                                    </div>

                                    {/* INPUTS */}
                                    <div className="grid gap-4 md:grid-cols-2">

                                        <input
                                            type="text"
                                            placeholder="Clip Title"
                                            value={clip.title}
                                            onChange={(e) =>
                                                handleArrayChange(
                                                    "clips",
                                                    index,
                                                    "title",
                                                    e.target.value
                                                )
                                            }
                                            className="rounded-lg border border-zinc-700 bg-[#0b1120] p-3 outline-none"
                                        />

                                        <input
                                            type="text"
                                            placeholder="Clip URL"
                                            value={clip.clipUrl}
                                            onChange={(e) =>
                                                handleArrayChange(
                                                    "clips",
                                                    index,
                                                    "clipUrl",
                                                    e.target.value
                                                )
                                            }
                                            className="rounded-lg border border-zinc-700 bg-[#0b1120] p-3 outline-none"
                                        />

                                        <input
                                            type="text"
                                            placeholder="Thumbnail URL"
                                            value={clip.thumbnailUrl}
                                            onChange={(e) =>
                                                handleArrayChange(
                                                    "clips",
                                                    index,
                                                    "thumbnailUrl",
                                                    e.target.value
                                                )
                                            }
                                            className="rounded-lg border border-zinc-700 bg-[#0b1120] p-3 outline-none md:col-span-2"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>


                    {/* ACHIEVEMENTS */}
                    <div className="rounded-xl border border-zinc-800 bg-[#0b1120] p-6">

                        <div className="mb-5 flex items-center justify-between">
                            <h2 className="text-xl font-semibold">
                                Achievements
                            </h2>

                            <button
                                type="button"
                                onClick={() =>
                                    addItem("achievements", {
                                        title: "",
                                        image: "",
                                    })
                                }
                                className="rounded-lg bg-cyan-500 px-4 py-2 text-black"
                            >
                                Add Achievement
                            </button>
                        </div>

                        <div className="space-y-5">

                            {formData.achievements.map((ach, index) => (

                                <div
                                    key={index}
                                    className="rounded-lg border border-zinc-700 bg-[#09111f] p-4"
                                >

                                    {/* TOP */}
                                    <div className="mb-4 flex items-center justify-between">

                                        <h3 className="text-sm text-zinc-400">
                                            Achievement #{index + 1}
                                        </h3>

                                        {/* REMOVE BUTTON */}
                                        {formData.achievements.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeItem("achievements", index)
                                                }
                                                className="flex h-8 w-8 items-center justify-center rounded-md border border-red-500 text-red-400"
                                            >
                                                ✕
                                            </button>
                                        )}
                                    </div>

                                    {/* INPUTS */}
                                    <div className="grid gap-4 md:grid-cols-2">

                                        <input
                                            type="text"
                                            placeholder="Achievement Title"
                                            value={ach.title}
                                            onChange={(e) =>
                                                handleArrayChange(
                                                    "achievements",
                                                    index,
                                                    "title",
                                                    e.target.value
                                                )
                                            }
                                            className="rounded-lg border border-zinc-700 bg-[#0b1120] p-3 outline-none"
                                        />

                                        <input
                                            type="text"
                                            placeholder="Image URL"
                                            value={ach.image}
                                            onChange={(e) =>
                                                handleArrayChange(
                                                    "achievements",
                                                    index,
                                                    "image",
                                                    e.target.value
                                                )
                                            }
                                            className="rounded-lg border border-zinc-700 bg-[#0b1120] p-3 outline-none"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>


                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full rounded-lg bg-cyan-400 px-6 py-3 font-semibold text-black transition hover:bg-cyan-300"
                    >
                        Create Profile
                    </button>
                </form>
            </div>
        </section>
    );
};

export default CreateProfile;