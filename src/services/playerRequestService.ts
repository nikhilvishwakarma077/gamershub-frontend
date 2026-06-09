import API from "./api";
import type {
    CreatePlayerRequestPayload
} from "../types/findPlayer.types";


export const createPlayerRequest = async (data: CreatePlayerRequestPayload ) => {
    const res = await API.post("/player-requests",data);

    return res.data;
};

export const getAllPlayerRequests = async () => {
    const res = await API.get("/player-requests");

    return res.data;
};

export const getMyPlayerRequests = async () => {
    const res = await API.get("/player-requests/my-player-requests");

    return res.data;
};

export const deleteMyPlayerRequestById = async (id: string ) => {
    const res = await API.delete(`/player-requests/${id}`);

    return res.data;
};