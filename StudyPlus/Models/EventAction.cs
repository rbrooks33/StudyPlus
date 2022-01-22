using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudyPlus.Models
{
    public class EventAction
    {
        public EventAction()
        {
            Args = new List<EventActionArg>();
        }
        public List<EventActionArg> Args { get; set; }
        public string DataString { get; set; }
    }
    public class EventActionArg
    {
        public string Name { get; set; }
        public string Value { get; set; }
    }
}
