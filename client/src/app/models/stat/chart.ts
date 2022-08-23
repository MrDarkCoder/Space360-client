export interface ChartRespone {
  labels: string[];
  data: number[];
}

export interface ReservationStat {
  totalReserved: number;
  totalCancelled: number;
  totalOnProgress: number;
  totalScheduled: number;
}

export interface TeamStat {
  totalTeams: number;
  totalUsers: number;
}

export interface SpaceStat {
  totalSpaceCategory: number;
  totalSpace: number;
  totalAvailableSpace: number;
  totalReservedSpace: number;
}

export interface CardStats{
    space:SpaceStat,
    reservations:ReservationStat,
    team:TeamStat
}
