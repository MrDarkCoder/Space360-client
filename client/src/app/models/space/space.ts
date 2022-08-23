export interface Space {
  spaceId: number;
  spaceName: string;
  spaceCategory: SpaceCategory;
  opensAt: string;
  closeAt: string;
  spaceCapacity: number;
  status: Status;
}

export interface SpaceCategory {
  spaceCategoryId: number;
  spaceCategoryName: string;
}

export interface Status {
  statusId: number;
  statusName: string;
}

export interface reservedSpace{
  spaceId:number,
  spaceName:string,
  
}