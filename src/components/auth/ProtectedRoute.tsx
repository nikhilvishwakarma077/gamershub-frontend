import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";


const ProtectedRoute = () => {

  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
  );

  const loading = useAuthStore(
    (state) => state.loading
  );

  // auth check pending
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050816]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-700 border-t-cyan-400" />
      </div>
    );
  }

  // not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // logged in
  return <Outlet />;
};

export default ProtectedRoute;