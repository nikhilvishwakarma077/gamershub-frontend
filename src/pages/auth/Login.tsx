
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMe, loginUser } from "../../services/authService";
import { useAuthStore } from "../../store/authStore";
import { myProfile } from "../../services/profileService";
import { useProfileStore } from "../../store/profileStore";

const LoginPage = () => {

    const navigate = useNavigate()

    const { setUser } = useAuthStore();
    const { setProfile } = useProfileStore()

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const loginRes = await loginUser(formData)
        setUser(loginRes.data);

        const authRes = await getMe()
        setUser(authRes.data);


        if (loginRes) {
            navigate("/")
        }
        const profileRes = await myProfile();
        setProfile(profileRes.profile);

    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">

            <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900/70 p-8 shadow-[0_0_40px_rgba(34,211,238,0.08)] backdrop-blur">

                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-black text-white">
                        Gamer<span className="text-cyan-400">Hub</span>
                    </h1>

                    <p className="mt-2 text-zinc-400">
                        Enter the NeoArena
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >
                    <div>
                        <label className="mb-2 block text-sm text-zinc-300">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-zinc-300">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-xl bg-cyan-400 py-3 font-bold text-black transition hover:scale-[1.02]"
                    >
                        Login
                    </button>
                </form>

                <p className="mt-6 text-center text-zinc-400">
                    Don&apos;t have an account?{" "}
                    <Link
                        to="/register"
                        className="font-semibold text-cyan-400 hover:underline"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;