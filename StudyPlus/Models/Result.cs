using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudyPlus.Models
{
    /// <summary>
    /// Note: Debug.HandleError3 assumes the result.message is
    /// a valid alert message (bad or good) and that result.Data
    /// contains the detailed error message
    /// </summary>
    public class Result
    {
        public Result()
        {
            Messages = new List<string>();
        }
        public bool Success { get; set; }
        public string Message { get; set; }
        public object Data { get; set; }
        public bool ShowFailMessage { get; set; }
        public string FailMessage { get; set; }
        public List<string> Messages { get; set; }
    }
}
