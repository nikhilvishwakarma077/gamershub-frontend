import API from "./api";

export const registerUser = async (data: any) => {
  const res = await API.post("/auth/register", data);

  return res.data;
};

export const loginUser = async (data: any) => {
  const res = await API.post("/auth/login", data, 
    {
        withCredentials: true,
    });

  return res.data;
};
export const getMe = async () => {
  const res = await API.get("/auth/me");

  return res.data;
};

export const logoutUser = async () => {

  const res = await API.post(
    "/auth/logout",
    {},
  );

  return res.data;
};