import API from "./api"


export const myProfile = async () => {
    const res = await API.get(`/profile/me`)
    return res.data
}
export const getAllProfiles = async () => {
    const res = await API.get(`/profile`)
    return res.data
}
export const getProfileById = async (id: string) => {
    const res = await API.get(`/profile/${id}`)
    return res.data
}


export const createProfile = async (data: FormData) => {
    const res = await API.post(`/profile/`, data, {
        headers: { "Content-Type": "multipart/form-data" },
    })
    return res.data
}

export const updateProfile = async (data: FormData) => {
    const res = await API.put(`/profile/`, data)
    return res.data
}





