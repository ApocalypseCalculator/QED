export enum LocationType {
    ONLINE, HYBRID, IN_PERSON
}

type User = {
    firstname: string;
    lastname: string;
    age: number;
    location: string;

    bio: string;
}

export type LearnerProfileInputs = User;

export type LearnerProfile = LearnerProfileInputs & {
    topics: Array<string>;
    ongoing: Array<Mentorship>;
}

export type MentorProfile = User & {
    topics: Array<Teachable>
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