using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace StudyPlus.Models.StudyBooks
{
    public class StudyBook
    {
        [Key]
        public int ID { get; set; }
        public string Title { get; set; }
        public string SubTitle { get; set; }
        public bool Pinned { get; set; }
        public decimal X { get; set; }
        public decimal Y { get; set; }
        public decimal Height { get; set; }
        public decimal Width { get; set; }
        
    }
}
