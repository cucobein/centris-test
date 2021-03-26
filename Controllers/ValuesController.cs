using centris_test.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;

namespace centris_test.Controllers
{
    [Route("api/file")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        [HttpPost]
        public IActionResult Post([FromForm] FileModel file)
        {
            try
            {
                string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", file.FileName);

                using (var stream = new FileStream(path, FileMode.Create))
                {
                    file.FormFile.CopyTo(stream);
                }

                List<ResponseModel> responseList = new List<ResponseModel>();

                responseList.Add(new ResponseModel { Name = "Juan 1", MilesDriven = "12 Miles", MilesPerHour = "123 mph" });
                responseList.Add(new ResponseModel { Name = "Juan 2", MilesDriven = "123 Miles", MilesPerHour = "432 mph" });
                responseList.Add(new ResponseModel { Name = "Juan 3", MilesDriven = "1234 Miles", MilesPerHour = "1467523 mph" });
                responseList.Add(new ResponseModel { Name = "Juan 4", MilesDriven = "12345 Miles", MilesPerHour = "123 mph" });
                responseList.Add(new ResponseModel { Name = "Juan 5", MilesDriven = "123456 Miles", MilesPerHour = "787 mph" });
                responseList.Add(new ResponseModel { Name = "Juan 6", MilesDriven = "1234567 Miles", MilesPerHour = "33453 mph" });
                responseList.Add(new ResponseModel { Name = "Juan 7", MilesDriven = "12345678 Miles", MilesPerHour = "978 mph" });
                responseList.Add(new ResponseModel { Name = "Juan 8", MilesDriven = "123456789 Miles", MilesPerHour = "234 mph" });
                responseList.Add(new ResponseModel { Name = "Juan 9", MilesDriven = "1234567890 Miles", MilesPerHour = "78658 mph" });

                string jsonResponse = JsonSerializer.Serialize(responseList);

                return Ok(jsonResponse);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
