import {UserData} from "./UserData";

export interface RatingData {
    topUsers: TopUser[];
    userPosition: number
}

interface TopUser {
    position: number;
    user: UserData;
}