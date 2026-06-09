import API from "./api"
import type { CreateProfileData, UpdateProfileData } from "../types/profile.types"


export const myProfile =async ()=>{
    const res = await API.get(`/profile/me`)
    return res.data
}
export const getAllProfiles =async ()=>{
    const res = await API.get(`/profile`)
    return res.data
}
export const getProfileById =async (id:string)=>{
    const res = await API.get(`/profile/${id}`)
    return res.data
}


export const createProfile =async (data:CreateProfileData)=>{
    const res = await API.post(`/profile/`,data)
    return res.data
}


export const updateProfile =async (data:UpdateProfileData)=>{
    const res = await API.put(`/profile/`,data)
    return res.data
}


 


