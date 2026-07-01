import API from "./api";

export const getAllClips = async () => {
    const res = await API.get("/clips");
    return res.data;
};