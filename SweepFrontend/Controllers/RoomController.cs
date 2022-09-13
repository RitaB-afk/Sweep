using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;
using CaseMSU22.Models;
using Microsoft.Extensions.Configuration;
using System.Net.NetworkInformation;
using System.IO.Ports;

namespace CaseMSU22.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomController : ControllerBase
    {

        private readonly IConfiguration _config;
        static SerialPort SP;
        static string servo;

        public RoomController(IConfiguration config)
        {
            _config = config;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select RoomNumber, RoomCategory, RoomLevel, RoomOccupancyStatus, convert(varchar(10),LastCleaned,120) as LastCleaned, CleaningStatus, Comment from dbo.Rooms";
            DataTable dt = new DataTable();
            string sqlDataSource = _config.GetConnectionString("CleaningManagementCon");
            SqlDataReader myReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand cmd = new SqlCommand(query, myCon))
                {
                    myReader = cmd.ExecuteReader();
                    dt.Load(myReader); ;
                    myReader.Close();
                    myCon.Close();
                }
            }

            //return datatable into Jsonresult

            return new JsonResult(dt);

        }
        [HttpPost]
        public JsonResult Post(Room room)
        {
            string query = @"
                    insert into dbo.Rooms (RoomNumber, RoomCategory, RoomLevel, RoomOccupancyStatus, LastCleaned, CleaningStatus, Comment) values ('" + room.RoomNumber+ @"'
                     ,'" + room.RoomCategory + @"'
                     ,'"+ room.RoomLevel + @"'
                  ,'" + room.RoomOccupancyStatus + @"'
                ,'" + room.LastCleaned +@"'
                ,'"+ room.CleaningStatus +@"'
                 ,'" +room.Comment +@"'
                    )";                        
            DataTable dt = new DataTable();
            string sqlDataSource = _config.GetConnectionString("CleaningManagementCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    dt.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added a New Room Successfully");
        }
    
        [HttpPut]
        public JsonResult Put(Room room)
        {
            string query = @"UPDATE dbo.Rooms SET RoomCategory= '" + room.RoomCategory +@"'
,RoomLevel = '" + room.RoomLevel + @"'
, RoomOccupancyStatus = '" + room.RoomOccupancyStatus + @"'
, LastCleaned = '" + room.LastCleaned +@"'
,CleaningStatus = '" + room.CleaningStatus +@"'
,Comment = '" + room.Comment +@" '
  WHERE RoomNumber = " + room.RoomNumber + @" 
                    ";

            DataTable dt = new DataTable();
            string sqlDataSource = _config.GetConnectionString("CleaningManagementCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    dt.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Updated the Room  Information Successfully");
        }


        [HttpDelete("{RoomNumber}")]
        public JsonResult Delete(int RoomNumber)
        {
            string query = @"
                    delete from dbo.Rooms
                    where RoomNumber = " + RoomNumber+ @"";
            DataTable dt = new DataTable();
            string sqlDataSource = _config.GetConnectionString("CleaningManagementCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    dt.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Deleted the Room Successfully");
        }

        [HttpGet("status")]
        public IActionResult GetServerStatus()
        {
            return Ok();
        }

        [HttpPut("servodata")]
        public JsonResult Put(ServoData data)
        {
            string query = @"UPDATE dbo.Rooms SET CleaningStatus = '" + data.Status + @"'
  WHERE RoomNumber = " + 100+ @" 
                    ";

            DataTable dt = new DataTable();
            string sqlDataSource = _config.GetConnectionString("CleaningManagementCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    dt.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Updated the Cleaning info Successfully");
        }

    }
}
