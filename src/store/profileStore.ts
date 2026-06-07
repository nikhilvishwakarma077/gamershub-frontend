import { create } from "zustand";

type GamerProfile = {
    username: string;
    avatar: string;
    bio: string;
  
}; 

type ProfileState = {
    profile: GamerProfile | null;

    setProfile: (profile: GamerProfile) => void;

    clearProfile: () => void;
};

export const useProfileStore = create<ProfileState>((set) => ({
    profile: null,

    setProfile: (profile) => {
        set({ profile });
    },

    clearProfile: () => {
        set({ profile: null });
    },
}));