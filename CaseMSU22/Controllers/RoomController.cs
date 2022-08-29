using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;
using CaseMSU22.Models;
using Microsoft.Extensions.Configuration;

namespace CaseMSU22.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomController : ControllerBase
    {

        private readonly IConfiguration _config;

        public RoomController(IConfiguration config)
        {
            _config = config;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select";
            DataTable dt = new DataTable();
            string sqlDataSource = _config.GetConnectionString("CleaningManagementCon");
            SqlDataReader  myReader;

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
                    insert into dbo.Room values 
                    ()";
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
            string query = @"
                    update  dbo.Room set 
                    Comments = '" + blabla + @"'
                    where Roomnumber = " + blabla + @" 
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
                    delete from dbo.Room
                    where RoomNumber = " + RoomNumber+ @" 
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

            return new JsonResult("Deleted the Room Successfully");
        }
    }
}