namespace WeytBackend.Application.DTO
{
    public class CreateWorkoutDTO
    {
        public int ExerciseId { get; set; }

        public required CreateExerciseSetDTO[] ExerciseSet { get; set; }
    }
}
