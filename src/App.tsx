import { Route, Routes } from "react-router-dom"
import Navbar from "./common/ui/Navbar"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Profiles from "./pages/profile/Profiles";
import MyProfile from "./pages/profile/MyProfile";
import CreateProfile from "./pages/profile/CreateProfile";
import EditProfile from "./pages/profile/EditProfile";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import { useProfileStore } from "./store/profileStore";
import Profile from "./pages/profile/Profile";
import { getMe } from "./services/authService";
import MyPlayerRequests from "./pages/findPlayer/MyPlayerRequests";
import CreatePlayerRequest from "./pages/findPlayer/CreatePlayerRequest";
import FindPlayer from "./pages/findPlayer/FindPlayer";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ScrollToTop from "./common/ui/ScrollToTob";


const App = () => {

  const { setUser, logout, setLoading } = useAuthStore();
  const {
    clearProfile,
  } = useProfileStore();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authRes = await getMe()

        setUser(authRes.data);

      } catch (error) {
        logout();
        clearProfile();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);



  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
        toastClassName="custom-toast"
        className="custom-toast-body"
      />
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profiles" element={<Profiles />} />
        <Route path="/find-player" element={<FindPlayer />} />
        <Route path="/profile/:id" element={<Profile />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/my-requests" element={<MyPlayerRequests />} />
          <Route path="/create-request" element={<CreatePlayerRequest />} />
          <Route path="/create-profile" element={<CreateProfile />} />
          <Route path="/edit-profile/:id" element={<EditProfile />} />
        </Route>

      </Routes>

    </>
  )
}

export default App
