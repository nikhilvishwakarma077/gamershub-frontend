import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import loginImg from "../../assets/login_img2.jpg"

const Register = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (error) {
            setError("");
        }
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (isLoading) return;

        setError("");

        const username = formData.username.trim();
        const email = formData.email.trim();
        const password = formData.password;
        const confirmPassword =
            formData.confirmPassword;

        // Username validation
        if (!username) {
            return setError("Username is required");
        }

        if (username.length < 3) {
            return setError(
                "Username must be at least 3 characters"
            );
        }

        // Email validation
        if (!email) {
            return setError("Email is required");
        }

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return setError(
                "Please enter a valid email address"
            );
        }

        // Password validation
        if (!password) {
            return setError("Password is required");
        }

        if (password.length < 4) {
            return setError(
                "Password must be at least 4 characters"
            );
        }

        // Confirm Password validation
        if (!confirmPassword) {
            return setError(
                "Confirm Password is required"
            );
        }

        if (password !== confirmPassword) {
            return setError(
                "Password and Confirm Password do not match"
            );
        }

        try {
            setIsLoading(true);

            const payload = { username, email, password };

            const res = await registerUser(payload);

            toast.success(res?.message || "Account created successfully");

            navigate("/login");

        } catch (err: any) {

            const message = err?.response?.data?.message || "Registration failed";
            setError(message);
            toast.error(message);

        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050816] px-4 py-20">

            {/* Background Image */}
            <img
                src={loginImg}
                alt="gaming"
                className="absolute inset-0 scale-107 h-full w-full object-cover opacity-75 animate-landing-float "
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
            <div className="relative z-10 w-full max-w-xl overflow-hidden border border-zinc-800 bg-[#0b1120]/95 backdrop-blur-xl">

                {/* Accent */}
                <div className="h-1 bg-linear-to-r from-transparent via-cyan-400 to-transparent" />

                <div className="p-8">

                    {/* Header */}
                    <div className="mb-5 text-center">



                        <h1 className="text-4xl font-black  tracking-wide text-white">
                            Gamers<span className="text-cyan-400">Hub</span>
                        </h1>

                        <p className="mt-3 text-sm text-zinc-400">
                            Create your esports identity and start competing.
                        </p>

                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6 "
                    >

                        {/* Inputs */}
                        <div className="grid gap-5 md:grid-cols-2">

                            {/* Username */}
                            <div>

                                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                                    Username
                                </label>

                                <div className="group flex items-center border border-zinc-700 bg-[#09111f] transition-all duration-300 focus-within:border-cyan-500">



                                    <input
                                        type="text"
                                        name="username"

                                        value={formData.username}
                                        onChange={handleChange}
                                        placeholder="Enter username"
                                        className="w-full bg-transparent px-4 py-4 text-white outline-none placeholder:text-zinc-500"
                                    />

                                </div>

                            </div>

                            {/* Email */}
                            <div>

                                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                                    Email
                                </label>

                                <div className="group flex items-center border border-zinc-700 bg-[#09111f] transition-all duration-300 focus-within:border-cyan-500">



                                    <input
                                        type="email"
                                        name="email"

                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter email"
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

                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter password"
                                        className="w-full bg-transparent px-4 py-4 text-white outline-none placeholder:text-zinc-500"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="cursor-pointer px-4 text-zinc-500 hover:text-cyan-400"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>

                                </div>

                            </div>

                            {/* Confirm Password */}
                            <div>

                                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                                    Confirm Password
                                </label>

                                <div className="group flex items-center border border-zinc-700 bg-[#09111f] transition-all duration-300 focus-within:border-cyan-500">



                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"

                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Confirm password"
                                        className="w-full bg-transparent px-4 py-4 text-white outline-none placeholder:text-zinc-500"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword(!showConfirmPassword)
                                        }
                                        className="cursor-pointer px-4 text-zinc-500 hover:text-cyan-400"
                                    >
                                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>

                                </div>

                            </div>

                        </div>

                        {/* Error */}
                        {error && (
                            <div className="border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                                {error}
                            </div>
                        )}

                        {/* Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={` w-full cursor-pointer border border-cyan-500 px-6 py-4 text-sm font-bold uppercase tracking-[0.25em]
                          ${isLoading
                                    ? "cursor-not-allowed border-cyan-700 bg-cyan-500/20 text-cyan-500"
                                    : "bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500 hover:text-black "
                                }
    `}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center gap-3">
                                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-cyan-300 border-t-transparent" />
                                    <span>Creating Account...</span>
                                </div>
                            ) : (
                                "Create Account"
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

                    {/* Login */}
                    <p className="text-center text-sm text-zinc-400">

                        Already have an account?{" "}

                        <Link
                            to="/login"
                            className="font-semibold text-cyan-400 transition hover:text-cyan-300"
                        >
                            Login
                        </Link>

                    </p>

                </div>

            </div>

        </div>
    );

};

export default Register;