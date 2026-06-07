import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, UserCircle2 } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { useProfileStore } from "../../store/profileStore";
import { logoutUser } from "../../services/authService";

const Navbar = () => {

    const navigate = useNavigate()

    const user = useAuthStore((state) => state.user)
    const logout = useAuthStore((state) => state.logout)
    const clearProfile = useProfileStore((state) => state.clearProfile)


    const [mobileMenu, setMobileMenu] = useState(false);
    const [profileMenu, setProfileMenu] = useState(false);

    const logoutHandler = async () => {
        try {
            await logoutUser();
            logout();
            clearProfile();
            navigate("/login")
        } catch (error) {
            console.log(error)
        }
    }


    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        `transition font-medium ${isActive ? "text-cyan-400"
            : "text-zinc-300 hover:text-cyan-400"
        }`;


    return (
        <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-linear-to-r from-[#050816] via-[#050816]/95 to-[#050816] backdrop-blur">

            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

                {/* LOGO */}
                <Link
                    to="/"
                    onClick={() => setProfileMenu(false)}
                    className="text-2xl font-black tracking-wide text-white"
                >
                    Gamers<span className="text-cyan-400">Hub</span>
                </Link>

                {/* DESKTOP */}
                <div className="hidden items-center gap-8 md:flex">

                    <NavLink
                        to="/" end
                        onClick={() => setProfileMenu(false)}
                        className={navLinkClass}
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/profiles"
                        onClick={() => setProfileMenu(false)}
                        className={navLinkClass}
                    >
                        Profiles
                    </NavLink>

                    <NavLink
                        to="/find-player"
                        onClick={() => setProfileMenu(false)}
                        className={navLinkClass}
                    >
                        Find Player
                    </NavLink>

                    {!user ? (

                        <NavLink
                            to="/login"
                            className={({ isActive }) =>
                                `rounded-xl border px-5 py-2 font-semibold transition
                             ${isActive ? "border-cyan-400 bg-cyan-400 text-black"
                                    : "border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black"
                                }`} >
                            Login
                        </NavLink>
                    ) : (
                        <div className="relative">

                            <button
                                onClick={() =>
                                    setProfileMenu(!profileMenu)
                                }
                                className="flex items-center"
                            >

                                {user?.avatarUrl ? (
                                    <img
                                        src={`/avatars/${user.avatarUrl}`}
                                        // src={avatar1}
                                        onError={(e) => {
                                            e.currentTarget.src =
                                                "https://cdn-icons-png.flaticon.com/512/149/149071.png";
                                        }}
                                        alt="profile"
                                        className="h-9 w-9 rounded-full border border-cyan-400/40 object-cover transition duration-300 hover:scale-110"
                                    />
                                ) : (
                                    <UserCircle2
                                        size={34}
                                        className="text-cyan-400 transition hover:scale-110"
                                    />

                                )}
                            </button>

                            {profileMenu && (

                                <div className="absolute right-0 mt-4 w-52 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">

                                    <div className="border-b border-zinc-800 px-4 py-3">

                                        <p className="font-semibold text-white">
                                            {user.username}
                                        </p>

                                        <p className="truncate text-sm text-zinc-400">
                                            {user.email}
                                        </p>
                                    </div>

                                    <div className="flex flex-col">

                                        <NavLink
                                            to="/my-profile"
                                            onClick={() =>
                                                setProfileMenu(false)
                                            }
                                            className={({ isActive }) =>
                                                `px-4 py-3 transition
                                            ${isActive ? "bg-zinc-800 text-cyan-400"
                                                    : "text-zinc-300 hover:bg-zinc-800 hover:text-cyan-400"}`} >
                                            My Profile
                                        </NavLink>

                                        <NavLink
                                            to="/my-requests"
                                            onClick={() =>
                                                setProfileMenu(false)
                                            }
                                            className={({ isActive }) =>
                                                `px-4 py-3 transition 
                                            ${isActive ? "bg-zinc-800 text-cyan-400"
                                                    : "text-zinc-300 hover:bg-zinc-800 hover:text-cyan-400"}`}>
                                            My Requests
                                        </NavLink>

                                        <button
                                            onClick={logoutHandler}
                                            className="px-4 py-3 text-left text-red-400 transition hover:bg-red-500/10"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* MOBILE */}
                <div className="flex items-center gap-3 md:hidden">

                    {!user ? (
                        <NavLink
                            to="/login"
                            className={({ isActive }) =>
                                `rounded-lg border px-4 py-2 text-sm font-semibold
                            ${isActive ? "border-cyan-400 bg-cyan-400 text-black"
                                    : "border-cyan-400 text-cyan-400"}`}>
                            Login
                        </NavLink>
                    ) : (
                        <div className="relative">

                            <button
                                onClick={() =>
                                    setProfileMenu(!profileMenu)
                                }
                            >

                                {user?.avatarUrl ? (

                                    <img
                                        src={`/avatars/${user.avatarUrl}`}
                                        alt="profile"
                                        onError={(e) => {
                                            e.currentTarget.src =
                                                "https://cdn-icons-png.flaticon.com/512/149/149071.png";
                                        }}
                                        className="h-9 w-9 rounded-full
                                        border border-cyan-400/40
                                        object-cover"
                                    />
                                ) : (

                                    <UserCircle2
                                        size={34}
                                        className="text-cyan-400"
                                    />
                                )}
                            </button>

                            {profileMenu && (
                                <div className="absolute right-0 mt-3 w-48 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">

                                    <NavLink
                                        to="/my-profile"
                                        onClick={() =>
                                            setProfileMenu(false)
                                        }
                                        className={({ isActive }) =>
                                            `block px-4 py-3
                                        ${isActive ? "bg-zinc-800 text-cyan-400"
                                                : "text-zinc-300 hover:bg-zinc-800"
                                            }`}>
                                        My Profile
                                    </NavLink>

                                    <NavLink
                                        to="/my-requests"
                                        onClick={() =>
                                            setProfileMenu(false)
                                        }
                                        className={({ isActive }) =>
                                            `block px-4 py-3
                                        ${isActive ? "bg-zinc-800 text-cyan-400"
                                                : "text-zinc-300 hover:bg-zinc-800"
                                            }`}>
                                        My Requests
                                    </NavLink>

                                    <button
                                        onClick={logoutHandler}
                                        className="w-full px-4 py-3 text-left text-red-400 hover:bg-red-500/10"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* MOBILE MENU BUTTON */}
                    <button
                        onClick={() =>
                            setMobileMenu(!mobileMenu)
                        }
                        className="text-white"
                    >
                        {mobileMenu ? (
                            <X size={28} />
                        ) : (
                            <Menu size={28} />
                        )}
                    </button>
                </div>
            </div>

            {/* MOBILE DROPDOWN */}
            {mobileMenu && (
                <div className="border-t border-zinc-800 bg-zinc-950 md:hidden">

                    <div className="flex flex-col px-4 py-4">

                        <NavLink
                            to="/profiles"
                            className={({ isActive }) =>
                                `py-3 
                            ${isActive ? "text-cyan-400"
                                    : "text-zinc-300 hover:text-cyan-400"
                                }`}>
                            Profiles
                        </NavLink>

                        <NavLink
                            to="/find-player"
                            className={({ isActive }) =>
                                ` py-3 
                            ${isActive ? "text-cyan-400" :
                                    "text-zinc-300 hover:text-cyan-400"}`}>
                            Find Player
                        </NavLink>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;