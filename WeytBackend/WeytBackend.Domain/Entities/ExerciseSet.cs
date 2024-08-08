using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WeytBackend.Domain.Entities
{
    public class ExerciseSet
    {
        public int Id { get; set; }
        public int Reps { get; set; }
        public double Weight { get; set; }
        public string Duration { get; set; }
        public DateTime Date { get; set; }
        public int WorkoutId { get; set; }
        public int Number { get; set; }
    }
}
