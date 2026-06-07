


export type ProfileType  = {
  banner: string;
  avatar: string;
  username: string;
  uid: string;
  bio: string;
  country: string;
  languages: string[];
  role: string;
  age: number;

  socialLinks: {
    instagram: string;
    discord: string;
  };
  availability: {
    status: string;
  };

  stats: {
    currentRank: string;
    kdRatio: string;
    headshotPercentage: string;
  };

  clips: {
    title: string;
    clipUrl:string;
    thumbnailUrl: string;
  }[];

  achievements: {
    title: string;
    image: string;
  }[];

  experience: {
    level: number;
    yearsPlaying: string;
    esportsExperience: string;
  };

  teamHistory: {
    teamName: string;
    role: string;
    duration: string;
  }[];
};

export type ProfileCards  = {
    _id: string;
    username: string;
    uid: number;
    avatar: string;
    role: string;
    country: string;
    languages: string[];
    socialLinks: {
        instagram: string;
        discord: string;
    };
    experience: {
        level: number;
        esportsExperience: number;
    };
    availability: {
        status: string;
    };
};

export type MyProfileType = {
    _id: string;
    banner: string;
    avatar: string;
    username: string;
    uid: string;
    bio: string;
    country: string;
    languages: string[];
    role: string;
    age: number;

    availability: {
        status: string;
    };

    stats: {
        currentRank: string;
        kdRatio: string;
        headshotPercentage: string;
    };

    clips: {
        title: string;
        clipUrl:string;
        thumbnailUrl: string;
    }[];

    achievements: {
        title: string;
        image: string;
    }[];

    experience: {
        level: number;
        yearsPlaying: string;
        esportsExperience: string;
    };

    teamHistory: {
        teamName: string;
        role: string;
        duration: string;
    }[];
}; 

export type UpdateProfileData = { 
    username: string;
    uid: number | string;
    age: number | string;
    bio: string;
    country: string;
    avatar: string;
    banner: string;
    role: string;
    languages: string[];
     socialLinks: {
        instagram: string;
        discord: string;
    };

    stats: {
        currentRank: string;
        kdRatio: number |  string;
        headshotPercentage: number | string;
    };

    experience: {
        level: number | string;
        yearsPlaying: number |string;
        esportsExperience: number |string;
    };

    availability: {
        status: string;
    };

    clips: {
        title: string;
        clipUrl: string;
        thumbnailUrl: string;
    }[];

    achievements: {
        title: string;
        image: string;
    }[];

    teamHistory: {
        teamName: string;
        role: string;
        duration: string;
    }[];
};

export type UpdateProfilePayload = {
  username: string;

  uid: number;

  age: number;

  bio: string;

  country: string;

  avatar: string;

  banner: string;

  role: string;

  languages: string[];
  socialLinks: {
    instagram: string;
    discord: string;
  };

  stats: {
    currentRank: string;

    kdRatio: number;

    headshotPercentage: number;
  };

  experience: {
    level: number;

    yearsPlaying: number;

    esportsExperience: number;
  };

  availability: {
    status: string;
  };

  clips: {
    title: string;
    clipUrl: string;
    thumbnailUrl: string;
  }[];

  achievements: {
    title: string;
    image: string;
  }[];

  teamHistory: {
    teamName: string;
    role: string;
    duration: string;
  }[];
};

export type CreateProfileData = {
    username: string;
    uid: string | number | "";
    age: string | number | "";
    bio: string;
    country: string;
    avatar: string;
    banner: string;
    role: string;
    languages: string[];
    
    socialLinks: {
        instagram: string;
        discord: string;
    };

    stats: {
        currentRank: string;
        kdRatio: string | number | "";
        headshotPercentage: string | number | "";
    };

    experience: {
        level: string | number | "";
        yearsPlaying: string | number | "";
        esportsExperience: string | number | "";
    };

    availability: {
        status: string;
    };

    clips: {
        title: string;
        clipUrl: string;
        thumbnailUrl: string;
    }[];

    achievements: {
        title: string;
        image: string;
    }[];

    teamHistory: {
        teamName: string;
        role: string;
        duration: string;
    }[];
};

export type CreateProfilePayload = { 
    username: string;
    uid: number;
    age: number;
    bio: string;
    country: string;
    avatar: string;
    banner: string;
    role: string;
    languages: string[];
    
    socialLinks: {
        instagram: string;
        discord: string;
    };

    stats: {
        currentRank: string;
        kdRatio: number;
        headshotPercentage: number;
    };

    experience: {
        level: number;
        yearsPlaying: number;
        esportsExperience: number;
    };

    availability: {
        status: string;
    };

    clips: {
        title: string;
        clipUrl: string;
        thumbnailUrl: string;
    }[];

    achievements: {
        title: string;
        image: string;
    }[];

    teamHistory: {
        teamName: string;
        role: string;
        duration: string;
    }[];
};