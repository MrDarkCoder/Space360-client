export interface User {
  userId: number;
  userTeamId: number;
  userSubTeamId: number;
  email: string;
  userRole: string;
  isVerified: boolean;
  accessToken: string;
}
