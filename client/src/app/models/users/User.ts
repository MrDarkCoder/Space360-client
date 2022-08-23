export interface User {
  userId: number;
  userTeamId: number;
  userSubTeamId: number;
  email: string;
  userRole: string;
  isVerified: boolean;
  accessToken: string;
  teamName: string;
  subteamName: string;
  firstName: string;
  lastName: string;
}

export interface UserRespone{
  userId:number,
  username:string,
  email:string
}