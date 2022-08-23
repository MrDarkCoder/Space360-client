import { teams } from "../team/team";
import { User } from "../users/User";

export interface ReservationTimings{
    team:teams,
    reservedByUser:User,
    startsAt:Date,
    endsAt:Date,
    duration:string
}