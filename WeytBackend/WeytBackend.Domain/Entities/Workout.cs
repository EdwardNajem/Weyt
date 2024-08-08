using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WeytBackend.Domain.Entities
{
    public class Workout
    {
        public int Id { get; set; }
        public int WorkoutRoutineId { get; set; }
        public int ExerciseId { get; set; }
        public Boolean IsActive { get; set; }
        public DateTime Date { get; set; }
    }
}
