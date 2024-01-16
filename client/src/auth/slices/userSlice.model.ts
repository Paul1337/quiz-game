export interface UserDataScheme {
    email: string;
    username: string;
    id: string;
}

export interface UserProfileData {
    firstName: string;
    lastName: string;
}

export interface UserSliceScheme {
    isAuthed: boolean;
    userData: UserDataScheme | null;
    profileData: UserProfileData | null;
}
