import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProfileById, updateProfile } from "../../services/profileService";
import type { UpdateProfileData, UpdateProfilePayload } from "../../types/profile.types";
import {
  avatarOptions,
  bannerOptions,
} from "../../common/utils/profileImages";
import { toast } from "react-toastify";


const EditProfile = () => {
  const navigate = useNavigate();

  const availabilityOptions = [
    "looking for team",
    "open for scrims",
    "already in team",
  ];

  const [showAvatars, setShowAvatars] = useState(false);
  const [showBanners, setShowBanners] = useState(false);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [formData, setFormData] = useState<UpdateProfileData>({
    banner: "",
    avatar: "",
    username: "",
    uid: "",
    bio: "",
    country: "",
    languages: [],
    role: "",
    age: "",

    socialLinks: {
      instagram: "",
      discord: ""
    },
    availability: {
      status: "",
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

    teamHistory: [
      {
        teamName: "",
        role: "",
        duration: "",
      },
    ],

    clips: [
      {
        title: "",
        clipUrl: "",
        thumbnailUrl: "",
      },
    ],

    achievements: [
      {
        title: "",
        image: "",
      },
    ],
  });


  // INPUT CHANGE
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeForAvailability = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {

    const { name, value } = e.target;

    // availability.status handle
    if (name === "availability") {

      setFormData((prev) => ({
        ...prev,

        availability: {
          ...formData,
          status: e.target.value
        },
      }));

      return;
    }

    // normal fields
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // NESTED CHANGE
  const handleNestedChange = (
    section: string,
    field: string,
    value: string
  ) => {
    setFormData((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
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

  const { id } = useParams()

  useEffect(() => {

    const fetchProfile = async (profileId: string) => {

      try {

        const res = await getProfileById(profileId);

        const data = res.profile;
        console.log(data.role)


        setFormData({
          banner: data.banner || "",
          avatar: data.avatar || "",
          username: data.username || "",
          uid: data.uid || "",
          bio: data.bio || "",
          country: data.country || "",
          languages: data.languages || [],
          role: data.role || "",
          age: data.age ?? "",

          availability: {
            status: data.availability?.status || "",
          },
          socialLinks: {
            instagram: data.socialLinks?.instagram || "",
            discord: data.socialLinks?.discord || "",
          },

          stats: {
            currentRank: data.stats?.currentRank || "",
            kdRatio: data.stats?.kdRatio || "",
            headshotPercentage:
              data.stats?.headshotPercentage || "",
          },

          experience: {
            level: data.experience?.level ?? "",
            yearsPlaying:
              data.experience?.yearsPlaying || "",
            esportsExperience:
              data.experience?.esportsExperience || "",
          },

          teamHistory:
            data.teamHistory?.length > 0
              ? data.teamHistory
              : [
                {
                  teamName: "",
                  role: "",
                  duration: "",
                },
              ],

          clips:
            data.clips?.length > 0
              ? data.clips
              : [
                {
                  title: "",
                  clipUrl: "",
                  thumbnailUrl: "",
                },
              ],

          achievements:
            data.achievements?.length > 0
              ? data.achievements
              : [
                {
                  title: "",
                  image: "",
                },
              ],
        });

      } catch (error) {

        console.log(error);

      }
    };
    if (!id) return;

    fetchProfile(id);

  }, [id]);


  // SUBMIT
  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (isSubmitting) return;

    const finalData: UpdateProfilePayload = {
      ...formData,

      uid: Number(formData.uid),
      age: Number(formData.age),

      languages: formData.languages,

      socialLinks: {
        instagram:
          formData.socialLinks.instagram,
        discord:
          formData.socialLinks.discord,
      },

      stats: {
        currentRank:
          formData.stats.currentRank,

        kdRatio: Number(
          formData.stats.kdRatio
        ),

        headshotPercentage: Number(
          formData.stats
            .headshotPercentage
        ),
      },

      experience: {
        level: Number(
          formData.experience.level
        ),

        yearsPlaying: Number(
          formData.experience
            .yearsPlaying
        ),

        esportsExperience: Number(
          formData.experience
            .esportsExperience
        ),
      },
    };

    try {
      setIsSubmitting(true);

      const res =
        await updateProfile(finalData);

      toast.success(
        res.message ||
        "Profile updated successfully"
      );

      console.log(res);

      // Optional:
      navigate("/my-profile");

    } catch (error: any) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
        "Failed to update profile"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <div className="mx-auto max-w-6xl px-4 py-20">

        {/* HEADER */}
        <div className="mb-8 flex items-center justify-between">
          <div>

            <h1 className="text-3xl font-bold tracking-wide ">
              Update Your <span className="text-cyan-400">Profile</span>
            </h1>

            <p className="mt-1 text-zinc-400">
              Keep your gamer profile and achievements up to date.
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
          className="space-y-8"
        >

          {/* BASIC INFO */}
          <div className="rounded-xl border border-zinc-800 bg-[#0b1120] p-6">

            <h2 className="mb-5 text-xl font-semibold">
              Basic Info
            </h2>

            <div className="grid gap-5 md:grid-cols-2">

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



              <input
                type="text"
                name="username"
                required
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="rounded-lg border border-zinc-700 bg-[#09111f] p-3 outline-none"
              />

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
                className="w-full rounded-md border border-zinc-700 bg-[#09111f] px-4 py-3 outline-none"
              />

              <input
                type="text"
                name="country"
                required
                placeholder="State, Country"
                value={formData.country}
                onChange={handleChange}
                className="rounded-lg border border-zinc-700 bg-[#09111f] p-3 outline-none"
              />

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
            bg-[#09111f]
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

              <input
                type="text"
                name="languages"
                required
                placeholder="Languages (comma separated)"
                value={formData.languages}
                onChange={handleChange}
                className="rounded-lg border border-zinc-700 bg-[#09111f] p-3 outline-none"
              />

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
                className="w-full rounded-md border border-zinc-700 bg-[#09111f] px-4 py-3 outline-none"
              />
            </div>

            <textarea
              name="bio"
              placeholder="Bio"
              value={formData.bio}
              onChange={handleChange}
              rows={5}
              className="mt-5 w-full rounded-lg border border-zinc-700 bg-[#09111f] p-3 outline-none"
            />
          </div>

          {/* AVAILABILITY */}
          <div>
            <h2 className="mb-5 text-xl font-semibold text-cyan-400">
              Availability<span className="ml-1 text-red-400">*</span>
            </h2>

            <select
              name="availability"
              required
              value={formData.availability.status}
              onChange={handleChangeForAvailability}
              className="w-full rounded-lg border border-zinc-700 bg-[#09111f] px-4 py-3 outline-none"
            >


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

          {/* STATS */}
          <div className="rounded-xl border border-zinc-800 bg-[#0b1120] p-6">

            <h2 className="mb-5 text-xl font-semibold">
              Current BR Stats
            </h2>

            <div className="grid gap-5 md:grid-cols-3">

              <input
                type="text"
                placeholder="Current Rank"
                value={formData.stats.currentRank}
                onChange={(e) =>
                  handleNestedChange(
                    "stats",
                    "currentRank",
                    e.target.value
                  )
                }
                className="rounded-lg border border-zinc-700 bg-[#09111f] p-3 outline-none"
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
                className="rounded-md border border-zinc-700 bg-[#09111f] px-4 py-3 outline-none"
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
                className="rounded-md border border-zinc-700 bg-[#09111f] px-4 py-3 outline-none"
              />
            </div>
          </div>

          {/* EXPERIENCE */}
          <div className="rounded-xl border border-zinc-800 bg-[#0b1120] p-6">

            <h2 className="mb-5 text-xl font-semibold">
              Experience<span className="ml-1 text-red-400">*</span>
            </h2>

            <div className="grid gap-5 md:grid-cols-3">

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
                className="rounded-md border border-zinc-700 bg-[#09111f] px-4 py-3 outline-none"
              />

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
                className="rounded-md border border-zinc-700 bg-[#09111f] px-4 py-3 outline-none"
              />

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
                className="rounded-md border border-zinc-700 bg-[#09111f] px-4 py-3 outline-none"
              />
            </div>
          </div>

          {/* TEAM HISTORY */}
          <div className="rounded-xl border border-zinc-800 bg-[#0b1120] p-6">

            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Team History
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

          {/* CLIPS */}
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

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full rounded-xl bg-cyan-500 py-4 text-lg font-semibold text-black"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;