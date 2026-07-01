import API from "./api";
import type { GetAllClipsResponse } from "../types/clip.types";

export const getAllClips = async (): Promise<GetAllClipsResponse> => {
    const res = await API.get<GetAllClipsResponse>("/clips");
    return res.data;
};