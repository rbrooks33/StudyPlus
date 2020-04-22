using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LiteDB;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudyPlus.Models;

namespace StudyPlus.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudyBookController : ControllerBase
    {
        private IWebHostEnvironment _env;

        private static string studyBooksDB = Environment.CurrentDirectory + "\\StudyBooksDB.db";

        public StudyBookController(IWebHostEnvironment env)
        {
            _env = env;
        }

        [Route("New")]
        public Result New()
        {
            var result = new Result();

            try
            {
                using (var db = new LiteDatabase(studyBooksDB))
                {
                    var table = db.GetCollection<Doc>("StudyBook");
                    table.Upsert(doc);

                    result.Data = doc;
                    result.Success = true;
                }
            }
            catch (Exception ex)
            {
                result.Data = ex;
            }


            return result;
        }
    }
}