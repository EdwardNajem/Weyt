namespace WeytBackend.Application.DTO
{
    public class CreateWorkoutRoutineDTO
    {
        public required string Title { get; set; }
        public required string UserEmail { get; set; }
        public required CreateWorkoutDTO[] Workout { get; set; }

    }
}
