export interface Room {
  id: Number;
  RoomNumber: number;
  RoomCategory: string;
  RoomLevel: number;
  RoomOccupancyStatus: string;
  LastCleaned: string;
  CleaningStatus: string;
  Comment: string;
}

export const rooms : Room[] = [
    {
        id: 1,
        RoomNumber: 1,
        RoomCategory: "single",
        RoomLevel: 10,
        RoomOccupancyStatus : "occupied",
        LastCleaned: "12.09.2022",
        CleaningStatus: "cleaned",
        Comment: "N/A" ,
    },
    {
      id: 2,
      RoomNumber: 2,
      RoomCategory: "double",
      RoomLevel: 10,
      RoomOccupancyStatus : "occupied",
      LastCleaned: "11.09.2022",
      CleaningStatus: "not cleaned",
      Comment: "N/A" ,
  },
  {
    id: 3,
    RoomNumber: 3,
    RoomCategory: "suite",
    RoomLevel: 10,
    RoomOccupancyStatus : "occupied",
    LastCleaned: "12.09.2022",
    CleaningStatus: "not cleaned",
    Comment: "N/A" ,
}
]