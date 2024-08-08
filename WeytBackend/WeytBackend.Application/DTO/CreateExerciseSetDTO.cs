namespace WeytBackend.Application.DTO
{
    public class CreateExerciseSetDTO
    {
        public int Reps { get; set; }
        public double Weight { get; set; }
        public  string? Duration { get; set; }
        public int Number { get; set; }
    }
}
