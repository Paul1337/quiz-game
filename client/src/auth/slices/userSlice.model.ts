export enum Role {
    Admin = 'admin',
    Player = 'player',
}

export const AllRoles = Object.values(Role);

export interface UserDataScheme {
    email: string;
    username: string;
    id: string;
    roles: Role[];
}

export interface UserStatScheme {
    gamesPlayed: number;
    correctAnswers: number;
    answersPlayed: number;
}

export interface UserProfileData {
    firstName: string;
    lastName: string;
    points: number;
    stat: UserStatScheme;
}

export interface UserSliceScheme {
    isAuthed: boolean;
    userData: UserDataScheme | null;
    profileData: UserProfileData | null;
}
