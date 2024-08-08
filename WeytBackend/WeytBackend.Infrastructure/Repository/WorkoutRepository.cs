using Dapper;
using Npgsql;
using WeytBackend.Domain.Entities;

namespace WeytBackend.Infrastructure.Repository
{
    public interface IWorkoutRepository
    {
        public Task<IEnumerable<Exercise>> GetAllExerciseListAsync();
        public Task<int> CreateWorkoutRoutine(string title, int userId);
        public Task<int> CreateWorkout(int workoutRoutineId, int exerciseId);
        public Task CreateExerciseSet(int reps, double weight, string duration, int workoutId, int setNumber);
    }
    public class WorkoutRepository(string connectionString) : IWorkoutRepository
    {
        private readonly string _connectionString = connectionString;

        private Npgsql.NpgsqlConnection CreateConnection()
        {
            return new NpgsqlConnection(_connectionString);
        }
        public async Task<IEnumerable<Exercise>> GetAllExerciseListAsync()
        {
            string getExerciseSql = @"SELECT * FROM public.""Exercises""";
            using var dbConnection = CreateConnection();
            return await dbConnection.QueryAsync<Exercise>(getExerciseSql);
        }

        public async Task<int> CreateWorkoutRoutine(string title, int userId)
        {
            string createRoutineSql = @"INSERT INTO public.""WorkoutRoutine"" (""Title"", ""UserId"") values (@Title, @UserId) returning ""Id""";
            using var dbConnection = CreateConnection();
            return await dbConnection.QueryFirstAsync<int>(createRoutineSql, new { Title = title, UserId = userId });
        }

        public async Task<int> CreateWorkout(int workoutRoutineId, int exerciseId)
        {
            string createWorkoutSql = @"INSERT INTO public.""Workout"" (""WorkoutRoutineId"", ""ExerciseId"", ""IsActive"", ""Date"") values (@WorkoutRoutineId ,@ExerciseId, TRUE, @Date)  returning ""Id""";
            using var dbConnection = CreateConnection();
            return await dbConnection.QueryFirstAsync<int>(createWorkoutSql, new { WorkoutRoutineId = workoutRoutineId, ExerciseId = exerciseId, Date = DateTime.Now });
        }

        public async Task CreateExerciseSet(int reps, double weight, string duration, int workoutId, int setNumber)
        {
            string createExerciseSetSql = @"INSERT INTO public.""ExerciseSet"" (""Reps"", ""Weight"", ""Duration"", ""Date"", ""WorkoutId"", ""Number"") values (@Reps, @Weight, @Duration, @Date, @WorkoutId, @Number)";
            using var dbConnection = CreateConnection();
             await dbConnection.ExecuteAsync(createExerciseSetSql, new { Reps = reps, Weight = weight, Duration = duration, Date = DateTime.Now, WorkoutId = workoutId, Number = setNumber });
        }
    }
}
