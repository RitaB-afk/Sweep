namespace CaseMSU22.Models
{
    public class Room
    {
        public int RoomNumber { get; set; }
        public string RoomCategory { get; set; }
        public int RoomLevel { get; set; }
        public string RoomOccupancyStatus { get; set; }
        public DateTime LastCleaned { get; set; }
        public string CleaningStatus { get; set; }
        public string Comments { get; set; }
    }
}
