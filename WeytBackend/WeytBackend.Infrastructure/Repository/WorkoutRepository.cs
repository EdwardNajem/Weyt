using Dapper;
using Npgsql;
using WeytBackend.Domain.Entities;

namespace WeytBackend.Infrastructure.Repository
{
    public interface IWorkoutRepository { 
        public Task<IEnumerable<Exercise>> GetAllExerciseListAsync();
    }
    public class WorkoutRepository(string connectionString): IWorkoutRepository
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
    }
}
