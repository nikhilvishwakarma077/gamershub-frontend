import { useState } from "react";
import { createProfile } from "../../services/profileService";
import { useNavigate } from "react-router-dom";
import type { CreateProfileData } from "../../types/profile.types";
import { avatarOptions, bannerOptions } from "../../common/utils/profileImages";
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

    const navigate = useNavigate()

    const [showAvatars, setShowAvatars] = useState(false);
    const [showBanners, setShowBanners] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

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
                status: "",
            },
            clips: [
                {
                    title: "",
                    clipUrl: "",
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
                    image: null,
                },
            ],
        });


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

    const handleAchievementImageChange = (
        index: number,
        file: File | null
    ) => {
        const updatedAchievements = [
            ...formData.achievements,
        ];

        updatedAchievements[index].image = file;

        setFormData((prev) => ({
            ...prev,
            achievements: updatedAchievements,
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



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isSubmitting) return;

        setIsSubmitting(true);

        try {

            const multipartData = new FormData();

            multipartData.append("username", formData.username);
            multipartData.append("uid", String(formData.uid));
            multipartData.append("age", String(formData.age));

            multipartData.append("avatar", formData.avatar);
            multipartData.append("banner", formData.banner);

            multipartData.append("bio", formData.bio);
            multipartData.append("country", formData.country);
            multipartData.append("role", formData.role);

            multipartData.append("languages", JSON.stringify(formData.languages));
            multipartData.append("socialLinks", JSON.stringify(formData.socialLinks));

            multipartData.append(
                "stats",
                JSON.stringify({
                    ...formData.stats,
                    kdRatio:
                        formData.stats.kdRatio === "" ? 0 : Number(formData.stats.kdRatio),

                    headshotPercentage:
                        formData.stats.headshotPercentage === "" ? 0 : Number(formData.stats.headshotPercentage),
                })
            );

            multipartData.append(
                "experience",
                JSON.stringify({
                    ...formData.experience,

                    level:
                        formData.experience.level === "" ? 1 : Number(formData.experience.level),

                    yearsPlaying:
                        formData.experience.yearsPlaying === "" ? 0 : Number(formData.experience.yearsPlaying),

                    esportsExperience:
                        formData.experience.esportsExperience === "" ? 0 : Number(formData.experience.esportsExperience),
                })
            );

            multipartData.append("availability", JSON.stringify(formData.availability));
            multipartData.append("clips", JSON.stringify(formData.clips));
            multipartData.append("teamHistory", JSON.stringify(formData.teamHistory));

            multipartData.append(
                "achievements",
                JSON.stringify(
                    formData.achievements.map((achievement) => ({
                        title: achievement.title,
                    }))
                )
            );

            formData.achievements.forEach((achievement) => {
                if (achievement.image) {
                    multipartData.append(
                        "achievementImages",
                        achievement.image
                    );
                }
            });

            // for (const [key, value] of multipartData.entries()) {
            //     console.log(key, value);
            // }

            const res = await createProfile(multipartData);
            toast.success(res?.message || "Profile created successfully");
            navigate("/my-profile");

        } catch (error: any) {
            console.log(error.response?.data);
            toast.error(error?.response?.data?.message || "Failed to create profile");

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
                                                    className={`h-24 w-24 rounded-xl border-2 object-cover transition-all duration-200
                                                    ${formData.avatar === avatar
                                                            ? "scale-105 border-cyan-400"
                                                            : "border-zinc-700 opacity-80 hover:opacity-100"}`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                )}

                            </div>

                            {/* Banner */}
                            <div className="mt-6 rounded-xl border border-zinc-800 bg-[#0b1120] p-6">

                                <div onClick={() => setShowBanners(!showBanners)}
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
                                                    className={`h-32 w-full rounded-xl border-2 object-cover transition-all duration-200
                                                    ${formData.banner === banner
                                                            ? "border-cyan-400"
                                                            : "border-zinc-700 opacity-80 hover:opacity-100"}`}
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
                                    className="w-full rounded-md border border-zinc-700 bg-[#111827] px-4 py-3 outline-none"
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
                                    className=" w-full rounded-md border border-zinc-700 bg-[#111827] px-4 py-3 outline-none"
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
                                        className="w-full rounded-lg  border border-zinc-700 bg-[#111827] p-3 outline-none"
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
                            className="absolute opacity-0 h-px w-px"
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
                                        }`}
                                >
                                    {language}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* STATS */}
                    <div className="w-full">
                        <h2 className="mb-4 text-lg font-semibold text-cyan-400 sm:mb-5 sm:text-xl">
                            Current BR Stats
                        </h2>

                        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">

                            <input
                                type="text"
                                placeholder="Current Rank"
                                value={formData.stats.currentRank}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        stats: {
                                            ...formData.stats,
                                            currentRank: e.target.value,
                                        },
                                    })
                                }
                                className="w-full rounded-md border border-zinc-700 bg-[#111827] px-4 py-3 text-sm outline-none transition-colors focus:border-cyan-500 sm:text-base"
                            />

                            <input
                                type="text"
                                inputMode="decimal"
                                placeholder="KD Ratio"
                                value={formData.stats.kdRatio}
                                onChange={(e) => {
                                    const value = e.target.value;

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
                                className="w-full rounded-md border border-zinc-700 bg-[#111827] px-4 py-3 text-sm outline-none transition-colors focus:border-cyan-500 sm:text-base"
                            />

                            <input
                                type="text"
                                inputMode="decimal"
                                placeholder="Headshot Percentage"
                                value={formData.stats.headshotPercentage}
                                onChange={(e) => {
                                    const value = e.target.value;

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
                                className="w-full rounded-md border border-zinc-700 bg-[#111827] px-4 py-3 text-sm outline-none transition-colors focus:border-cyan-500 sm:text-base"
                            />
                        </div>
                    </div>

                    {/* EXPERIENCE */}
                    <div className="w-full">
                        <h2 className="mb-4 text-lg font-semibold text-cyan-400 sm:mb-5 sm:text-xl">
                            Experience
                            <span className="ml-1 text-red-400">*</span>
                        </h2>

                        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">

                            {/* Level */}
                            <input
                                type="text"
                                required
                                inputMode="numeric"
                                placeholder="ID Level"
                                value={formData.experience.level}
                                onChange={(e) => {

                                    const value = e.target.value;

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
                                className="w-full rounded-md border border-zinc-700 bg-[#111827] px-4 py-3 text-sm outline-none transition-colors focus:border-cyan-500 sm:text-base"
                            />

                            {/* Years Playing */}
                            <input
                                type="text"
                                required
                                inputMode="numeric"
                                placeholder="Years Playing"
                                value={formData.experience.yearsPlaying}
                                onChange={(e) => {

                                    const value = e.target.value;

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
                                className="w-full rounded-md border border-zinc-700 bg-[#111827] px-4 py-3 text-sm outline-none transition-colors focus:border-cyan-500 sm:text-base"
                            />

                            {/* Esports Experience */}
                            <input
                                type="text"
                                required
                                inputMode="numeric"
                                placeholder="Esports Experience"
                                value={formData.experience.esportsExperience}
                                onChange={(e) => {

                                    const value = e.target.value;

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
                                className="w-full rounded-md border border-zinc-700 bg-[#111827] px-4 py-3 text-sm outline-none transition-colors focus:border-cyan-500 sm:text-base"
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
                    <div className="rounded-xl border border-zinc-800 bg-[#0b1120] p-4 sm:p-6">

                        {/* HEADER */}
                        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                            <h2 className="text-lg font-semibold sm:text-xl">
                                Team History{" "}
                                <span className="text-xs text-zinc-400 sm:text-sm">
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
                                className="w-full rounded-lg bg-cyan-500 px-4 py-2 font-medium text-black transition hover:bg-cyan-400 sm:w-auto"
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
                                    <div className="mb-4 flex items-center justify-between gap-3">

                                        <h3 className="text-sm text-zinc-400">
                                            Team #{index + 1}
                                        </h3>

                                        {formData.teamHistory.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeItem("teamHistory", index)
                                                }
                                                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-red-500 text-red-400"
                                            >
                                                ✕
                                            </button>
                                        )}
                                    </div>

                                    {/* INPUTS */}
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">

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
                                            className="w-full rounded-lg border border-zinc-700 bg-[#0b1120] p-3 text-sm outline-none transition-colors focus:border-cyan-500 sm:text-base"
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
                                            className="w-full rounded-lg border border-zinc-700 bg-[#0b1120] p-3 text-sm outline-none transition-colors focus:border-cyan-500 sm:text-base"
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
                                            className="w-full rounded-lg border border-zinc-700 bg-[#0b1120] p-3 text-sm outline-none transition-colors focus:border-cyan-500 sm:text-base"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Clips */}
                    <div className="rounded-xl border border-zinc-800 bg-[#0b1120] p-4 sm:p-6">

                        {/* Header */}
                        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                            <h2 className="text-lg font-semibold sm:text-xl">
                                Clips
                            </h2>

                            <button
                                type="button"
                                onClick={() =>
                                    addItem("clips", {
                                        title: "",
                                        clipUrl: "",
                                    })
                                }
                                className="w-full rounded-lg bg-cyan-500 px-4 py-2 font-medium text-black transition hover:bg-cyan-400 sm:w-auto"
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

                                    {/* Top Row */}
                                    <div className="mb-4 flex items-center justify-between gap-3">

                                        <h3 className="text-sm text-zinc-400">
                                            Clip #{index + 1}
                                        </h3>

                                        {formData.clips.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeItem("clips", index)
                                                }
                                                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-red-500 text-red-400 transition hover:bg-red-500/10"
                                            >
                                                ✕
                                            </button>
                                        )}
                                    </div>

                                    {/* Inputs */}
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

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
                                            className="w-full rounded-lg border border-zinc-700 bg-[#0b1120] p-3 text-sm outline-none transition focus:border-cyan-500 sm:text-base"
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
                                            className="w-full rounded-lg border border-zinc-700 bg-[#0b1120] p-3 text-sm outline-none transition focus:border-cyan-500 sm:text-base"
                                        />


                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>


                    {/* ACHIEVEMENTS */}
                    <div className="rounded-xl border border-zinc-800 bg-[#0b1120] p-4 sm:p-6">
                        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <h2 className="text-lg font-semibold sm:text-xl">
                                Achievements
                            </h2>

                            <button
                                type="button"
                                onClick={() =>
                                    addItem("achievements", {
                                        title: "",
                                        image: null,
                                    })
                                }
                                className="w-full rounded-lg bg-cyan-500 px-4 py-2 text-sm font-medium text-black transition hover:bg-cyan-400 sm:w-auto"
                            >
                                Add Achievement
                            </button>
                        </div>

                        <div className="space-y-5">
                            {formData.achievements.map((ach, index) => (
                                <div
                                    key={index}
                                    className="rounded-xl border border-zinc-700 bg-[#09111f] p-4 sm:p-5"
                                >
                                    {/* TOP */}
                                    <div className="mb-4 flex items-center justify-between gap-3">
                                        <h3 className="text-xs text-zinc-400 sm:text-sm">
                                            Achievement #{index + 1}
                                        </h3>

                                        {formData.achievements.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeItem(
                                                        "achievements",
                                                        index
                                                    )
                                                }
                                                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-red-500 text-red-400 transition hover:bg-red-500/10"
                                            >
                                                ✕
                                            </button>
                                        )}
                                    </div>

                                    {/* CONTENT */}
                                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                                        {/* TITLE */}
                                        <div className="space-y-2">
                                            <label className="text-xs text-zinc-400">
                                                Achievement Title
                                            </label>

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
                                                className="w-full rounded-lg border border-zinc-700 bg-[#0b1120] p-3 text-sm outline-none transition-colors focus:border-cyan-500 sm:text-base"
                                            />
                                        </div>

                                        {/* IMAGE */}
                                        <div className="space-y-3">
                                            <label className="text-xs text-zinc-400">
                                                Achievement Image
                                            </label>

                                            <input
                                                type="file"
                                                accept="image/png,image/jpeg,image/webp"
                                                onChange={(e) =>
                                                    handleAchievementImageChange(
                                                        index,
                                                        e.target.files?.[0] ||
                                                        null
                                                    )
                                                }
                                                className="w-full rounded-lg border border-zinc-700 bg-[#0b1120] p-3 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-cyan-500 file:px-3 file:py-2 file:text-black"
                                            />

                                            {ach.image && (
                                                <div className="flex justify-center sm:justify-start">
                                                    <img
                                                        src={URL.createObjectURL(
                                                            ach.image
                                                        )}
                                                        alt="achievement"
                                                        className="h-24 w-24 rounded-xl border border-zinc-700 object-cover sm:h-28 sm:w-28 md:h-32 md:w-32"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>


                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full  disabled:opacity-60 disabled:cursor-not-allowed bg-cyan-400 px-6 py-3 font-semibold text-black transition hover:bg-cyan-300"
                    >
                        {isSubmitting ? "Creating..." : "Create Profile"}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default CreateProfile;