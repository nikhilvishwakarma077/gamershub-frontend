 
 
 export type PlayerRequestFormData = {
    role: string;

    joiningType:
    | "permanent"
    | "temporary"
    | "scrims only";

    activeTime: string;

    languagesComfortable: string[];

    instagram: string;

    expiresAt: string;
};

export type CreatePlayerRequestPayload = {
    role: string;

    joiningType:
    | "permanent"
    | "temporary"
    | "scrims only";

    activeTime: string;

    languagesComfortable: string[];

    instagram: string;

    expiresAt: Date;
};

export type PlayerRequestData = {
    _id: string;
    userId: {
        username: string;
        _id: string;
    }
    role: string;

    joiningType:
    | "permanent"
    | "temporary"
    | "scrims only";

    activeTime: string;

    languagesComfortable: string[];

    instagram: string;

    createdAt: Date;

    expiresAt: Date;
};

export type MyPlayerRequestData = {
    _id: string;
    userId: {
        username: string;
        _id: string;
    }
    role: string;

    joiningType:
    | "permanent"
    | "temporary"
    | "scrims only";

    activeTime: string;

    languagesComfortable: string[];

    instagram: string;

    createdAt: Date;

    expiresAt: Date;
}; 