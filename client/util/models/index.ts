export enum LocationType {
    ONLINE, HYBRID, IN_PERSON
}

export type User = {
    firstname: string;
    lastname: string;
    age: number;
    location: string;
}

export type RegisterInputs = User & {
    username: string;
    password: string;
}

type ProfileInputs = {
    bio: string;
}

export type LearnerProfileInputs = ProfileInputs;
export type MentorProfileInputs = ProfileInputs;

export type LearnerProfile = User & {
    bio: string;
    topics: Array<string>;
    ongoing: Array<Mentorship>;
    userid: string;
}

export type MentorProfile = User & {
    bio: string;
    topics: Array<Teachable>;
    userid: string;
    recommended: string;
    ongoing: {
        paid: boolean;
        starttime: number;
        target: string;
        topic: string;
    }
}

export type Teachable = {
    name: string;
    skill: number; // Between 1 and 10
}

export type Mentorship = {
    target: string;
    topic: string;
    location: LocationType;
    paid: boolean;
    starttime: number;
}