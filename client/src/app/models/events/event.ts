import { subTeam } from "../subTeam/subTeam";
import { teams } from "../team/team";

export interface Event {
    reservationId:number,
    reservationTitle:string,
    team:teams,
    subTeam:subTeam,
}

export interface calendarEvents{
    resourceId:number,
    id:number,
    title:string,
    start:Date,
    end:Date
}