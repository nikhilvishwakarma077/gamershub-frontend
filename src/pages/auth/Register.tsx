import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";
import { toast } from "react-toastify";

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

        if (password.length < 6) {
            return setError(
                "Password must be at least 6 characters"
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

            const payload = {username,email,password};

            const res = await registerUser( payload );

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
        <div className="flex min-h-screen items-center justify-center py-20 bg-zinc-950 px-4">

            <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900/70 p-8 shadow-[0_0_40px_rgba(168,85,247,0.08)] backdrop-blur">

                <div className="mb-8 text-center">

                    <h1 className="text-4xl font-black text-white">
                        Gamer
                        <span className="text-cyan-400">
                            Hub
                        </span>
                    </h1>

                    {/* <p className="mt-2 text-zinc-400">
                        Create your NeoArena identity
                    </p> */}

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    {/* Username */}
                    <div>

                        <label className="mb-2 block text-sm text-zinc-300">
                            Username
                        </label>

                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter username"
                            className="
                                w-full rounded-xl
                                border border-zinc-700
                                bg-zinc-950
                                px-4 py-3
                                text-white
                                outline-none
                                transition
                                focus:border-cyan-400
                            "
                        />

                    </div>

                    {/* Email */}
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
                            className="
                                w-full rounded-xl
                                border border-zinc-700
                                bg-zinc-950
                                px-4 py-3
                                text-white
                                outline-none
                                transition
                                focus:border-cyan-400
                            "
                        />

                    </div>

                    {/* Password */}
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
                            className="
                                w-full rounded-xl
                                border border-zinc-700
                                bg-zinc-950
                                px-4 py-3
                                text-white
                                outline-none
                                transition
                                focus:border-cyan-400
                            "
                        />

                    </div>

                    {/* Confirm Password */}
                    <div>

                        <label className="mb-2 block text-sm text-zinc-300">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm password"
                            className="
                                w-full rounded-xl
                                border border-zinc-700
                                bg-zinc-950
                                px-4 py-3
                                text-white
                                outline-none
                                transition
                                focus:border-cyan-400
                            "
                        />

                    </div>

                    {/* Error Message */}
                    {error && (

                        <div
                            className="
                                rounded-xl
                                border border-red-500/30
                                bg-red-500/10
                                px-4 py-3
                                text-sm text-red-400
                            "
                        >
                            {error}
                        </div>

                    )}

                    <button
                        type="submit"
                        className="
                            w-full rounded-xl
                            bg-linear-to-r
                            from-cyan-400
                            to-purple-500
                            py-3
                            font-bold
                            text-black
                            transition
                            hover:scale-[1.02]
                        "
                    >
                        Create Account
                    </button>

                </form>

                <p className="mt-6 text-center text-zinc-400">

                    Already have an account?{" "}

                    <Link
                        to="/login"
                        className="
                            font-semibold
                            text-cyan-400
                            hover:underline
                        "
                    >
                        Login
                    </Link>

                </p>

            </div>

        </div>
    );
};

export default Register;