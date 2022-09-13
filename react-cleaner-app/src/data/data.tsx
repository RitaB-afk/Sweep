export interface Room {
  id: Number;
  roomNumber: number;
  roomCategory: string;
  roomLevel: number;
  roomOccupancyStatus: string;
  lastCleaned: string;
  cleaningStatus: string;
  comment: string;
}

export const rooms : Room[] = [
    {
        id: 1,
        roomNumber: 1,
        roomCategory: "single",
        roomLevel: 10,
        roomOccupancyStatus : "occupied",
        lastCleaned: "12.09.2022",
        cleaningStatus: "cleaned",
        comment: "N/A" ,
    },
    {
      id: 2,
      roomNumber: 2,
      roomCategory: "double",
      roomLevel: 10,
      roomOccupancyStatus : "occupied",
      lastCleaned: "11.09.2022",
      cleaningStatus: "not cleaned",
      comment: "N/A" ,
  },
  {
    id: 3,
    roomNumber: 3,
    roomCategory: "suite",
    roomLevel: 10,
    roomOccupancyStatus : "occupied",
    lastCleaned: "12.09.2022",
    cleaningStatus: "not cleaned",
    comment: "N/A" ,
}
]