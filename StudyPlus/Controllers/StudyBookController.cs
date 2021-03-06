﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LiteDB;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudyPlus.Models;
using StudyPlus.Models.StudyBooks;

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
            var newBook = new StudyBook();
            try
            {
                using (var db = new LiteDatabase(studyBooksDB))
                {
                    var table = db.GetCollection<StudyBook>("StudyBook");
                    table.Upsert(newBook);

                    result.Data = newBook;
                    result.Success = true;
                }
            }
            catch (Exception ex)
            {
                result.Data = ex;
            }

            return result;
        }
        [Route("List")]
        public Result List()
        {
            var result = new Result();
            try
            {
                using (var db = new LiteDatabase(studyBooksDB))
                {
                    result.Data = db.GetCollection<StudyBook>("StudyBook").FindAll().ToList();
                    result.Success = true;
                }
            }
            catch (Exception ex)
            {
                result.Data = ex;
            }

            return result;
        }
        [Route("Book")]
        public Result Book(int bookId)
        {
            var result = new Result();
            try
            {
                using (var db = new LiteDatabase(studyBooksDB))
                {
                    result.Data = db.GetCollection<StudyBook>("StudyBook").FindAll().ToList().Where(b => b.ID == bookId);
                    result.Success = true;
                }
            }
            catch (Exception ex)
            {
                result.Data = ex;
            }

            return result;
        }
        [Route("SaveBook")][HttpPost]
        public Result SaveBook([FromBody] StudyBook book)
        {
            var result = new Result();
            try
            {
                using (var db = new LiteDatabase(studyBooksDB))
                {
                    var books = db.GetCollection<StudyBook>("StudyBook"); //.FindAll().ToList().Where(b => b.ID == bookId);
                    books.Upsert(book);
                    result.Data = book;
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