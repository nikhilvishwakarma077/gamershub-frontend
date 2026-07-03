
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMe, loginUser } from "../../services/authService";
import { useAuthStore } from "../../store/authStore";
import { myProfile } from "../../services/profileService";
import { useProfileStore } from "../../store/profileStore";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import loginImg from "../../assets/login_img.jpg"

const LoginPage = () => {

    const navigate = useNavigate()

    const { setUser } = useAuthStore();
    const { setProfile } = useProfileStore()
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);

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

        try {
            setLoading(true);
            const loginRes = await loginUser(formData);

            setUser(loginRes.data);

            toast.success(
                loginRes.message || "Login successful"
            );
            navigate("/");

            try {
                const authRes = await getMe();
                setUser(authRes.data);
            } catch (error) {
                console.error("getMe failed:", error);
            }

            try {
                const profileRes = await myProfile();
                setProfile(profileRes.profile);
            } catch (error) {
                console.error("Profile fetch failed:", error);
            }

        } catch (error: any) {
            toast.error(
                error?.response?.data?.message ||
                "Login failed"
            );
        } finally {
            setLoading(false);
        }
    };

    // return (
    //     <div className="flex min-h-screen items-center justify-center bg-zinc-950 py-20 px-4">

    //         <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900/70 p-8 shadow-[0_0_40px_rgba(34,211,238,0.08)] backdrop-blur">

    //             <div className="mb-8 text-center">
    //                 <h1 className="text-4xl font-black text-white">
    //                     Gamer<span className="text-cyan-400">Hub</span>
    //                 </h1>

    //             </div>

    //             <form
    //                 onSubmit={handleSubmit}
    //                 className="space-y-5"
    //             >
    //                 <div>
    //                     <label className="mb-2 block text-sm text-zinc-300">
    //                         Email
    //                     </label>

    //                     <input
    //                         type="email"
    //                         name="email"
    //                         value={formData.email}
    //                         onChange={handleChange}
    //                         placeholder="Enter email"
    //                         className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
    //                     />
    //                 </div>

    //                 <div>
    //                     <label className="mb-2 block text-sm text-zinc-300">
    //                         Password
    //                     </label>

    //                     <input
    //                         type="password"
    //                         name="password"
    //                         value={formData.password}
    //                         onChange={handleChange}
    //                         placeholder="Enter password"
    //                         className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
    //                     />
    //                 </div>

    //                 <button
    //                     type="submit"
    //                     className="w-full rounded-xl bg-cyan-400 py-3 font-bold text-black transition hover:scale-[1.02]"
    //                 >
    //                     Login
    //                 </button>
    //             </form>

    //             <p className="mt-6 text-center text-zinc-400">
    //                 Don&apos;t have an account?{" "}
    //                 <Link
    //                     to="/register"
    //                     className="font-semibold text-cyan-400 hover:underline"
    //                 >
    //                     Register
    //                 </Link>
    //             </p>
    //         </div>
    //     </div>
    // );

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050816] px-4 py-20">

            {/* Background Image */}
            <img
                src={loginImg}
                alt="gaming"
                className="absolute inset-0 scale-107  h-full w-full object-cover opacity-75 animate-landing-float"
            />



            {/* FLOATING WORLD LAYER */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">


                {/* Glow Effects */}
                <div className="absolute left-0 top-20 h-100 w-100 rounded-full bg-cyan-500/10 blur-3xl" />
                <div className="absolute right-0 top-40 h-100 w-100 rounded-full bg-purple-500/10 blur-3xl " />

                {/* Moving Grid Glow Sweep */}
                <div className="absolute h-[200%] w-[200%] animate-sweep opacity-20 bg-[radial-gradient(circle,#22d3ee10_1px,transparent_1px)] bg-size-[40px_40px]" />

                {/* SHAPE 1 - DIAGONAL TRAVEL */}
                <div className="absolute h-16 w-16 border border-cyan-500/30 animate-path-1" />

                {/* SHAPE 2 - LEFT TO RIGHT LOOP */}
                <div className="absolute h-12 w-12 rotate-45 border border-cyan-400/30 animate-path-2" />

                {/* SHAPE 3 - BOUNCING ACROSS SCREEN */}
                <div className="absolute h-20 w-20 rounded-full border border-cyan-500/20 animate-path-3" />

                {/* SHAPE 4 - FAST SMALL PARTICLE */}
                <div className="absolute h-3 w-3 rounded-full bg-cyan-400/60 animate-path-4" />

                {/* SHAPE 5 - BIG ORBIT BOX */}
                <div className="absolute h-28 w-28 border border-purple-500/20 animate-path-5" />

            </div>

            {/* Card */}
            <div className="relative z-10 w-full max-w-md overflow-hidden border border-zinc-800 bg-[#0b1120]/95 backdrop-blur-xl">

                {/* Accent */}
                <div className="h-1 bg-linear-to-r from-transparent via-cyan-400 to-transparent" />

                <div className="p-8">

                    {/* Logo */}
                    <div className="mb-5 text-center">



                        <h1 className="text-4xl font-black  tracking-wide text-white">
                            Gamers<span className="text-cyan-400">Hub</span>
                        </h1>

                        <p className="mt-3 text-sm text-zinc-400">
                            Welcome back. Continue your esports journey.
                        </p>

                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >

                        {/* Email */}
                        <div>

                            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                                Email
                            </label>

                            <div className="group flex items-center border border-zinc-700 bg-[#09111f] transition-all duration-300 focus-within:border-cyan-500">

                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    className="w-full bg-transparent px-4 py-4 text-white outline-none placeholder:text-zinc-500"
                                />

                            </div>

                        </div>

                        {/* Password */}
                        <div>

                            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                                Password
                            </label>

                            <div className="group flex items-center border border-zinc-700 bg-[#09111f] transition-all duration-300 focus-within:border-cyan-500">

                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    className="w-full bg-transparent px-4 py-4 text-white outline-none placeholder:text-zinc-500"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="cursor-pointer px-4 text-zinc-500 transition hover:text-cyan-400"
                                >
                                    {showPassword ? (
                                        <EyeOff size={19} />
                                    ) : (
                                        <Eye size={19} />
                                    )}
                                </button>

                            </div>

                        </div>

                        {/* Forgot */}
                        <div className="flex justify-end">

                            <Link
                                to="/forgot-password"
                                className="text-sm text-cyan-400 transition hover:text-cyan-300"
                            >

                            </Link>

                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`
        w-full
        cursor-pointer
        border
        border-cyan-500
        px-6
        py-4
        text-sm
        font-bold
        uppercase
        tracking-[0.25em]
        ${loading
                                    ? "cursor-not-allowed border-cyan-700 bg-cyan-500/20 text-cyan-500"
                                    : "bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500 hover:text-black "
                                }
    `}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-3">
                                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-cyan-300 border-t-transparent" />
                                    <span>Logging In...</span>
                                </div>
                            ) : (
                                "Login"
                            )}
                        </button>

                    </form>

                    {/* Divider */}
                    <div className="my-8 flex items-center gap-4">

                        <div className="h-px flex-1 bg-zinc-800" />

                        <span className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                            OR
                        </span>

                        <div className="h-px flex-1 bg-zinc-800" />

                    </div>

                    {/* Register */}
                    <p className="text-center text-sm text-zinc-400">

                        Don't have an account?{" "}

                        <Link
                            to="/register"
                            className="font-semibold text-cyan-400 transition hover:text-cyan-300"
                        >
                            Create Account
                        </Link>

                    </p>

                </div>

            </div>

        </div>
    );
};

export default LoginPage;