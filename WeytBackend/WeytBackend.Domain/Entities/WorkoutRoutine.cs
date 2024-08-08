using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WeytBackend.Domain.Entities
{
    public class WorkoutRoutine
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public int UserId { get; set; }
    }
}
