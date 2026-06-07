import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";

const Register = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        if (error) {
            setError("");
        }
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();

        setError("");

        // Username validation
        if (!formData.username.trim()) {
            return setError("Username is required");
        }

        // Email validation
        if (!formData.email.trim()) {
            return setError("Email is required");
        }

        // Password validation
        if (!formData.password.trim()) {
            return setError("Password is required");
        }

        if (formData.password.length < 6) {
            return setError(
                "Password must be at least 6 characters"
            );
        }

        // Confirm password validation
        if (
            formData.password !==
            formData.confirmPassword
        ) {
            return setError(
                "Password and Confirm Password do not match"
            );
        }

        try {

            const payload = {
                username: formData.username,
                email: formData.email,
                password: formData.password,
            };

            const res = await registerUser(payload);

            console.log(res);

            navigate("/login");

        } catch (err: any) {

            setError(
                err?.response?.data?.message ||
                "Registration failed"
            );
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">

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