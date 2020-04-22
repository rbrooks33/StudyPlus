using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace StudyPlus.Models
{
    public class DocReview
    {
        public DocReview()
        {
            DateReviewed = DateTime.Now;
        }
        [Key]
        public int DocReviewID { get; set; }
        public int DocID { get; set; }
        public DateTime DateReviewed { get; set; }
    }
}
