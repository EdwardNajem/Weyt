using Dapper;
using Npgsql;
using WeytBackend.Domain.Entities;

namespace WeytBackend.Infrastructure.Repository
{
    public interface IUserRepository
    {
        public Task<User> Login(string email, string password);
    }
    public class UserRepository(string connectionString) : IUserRepository
    {
        private readonly string _connectionString = connectionString;

        private Npgsql.NpgsqlConnection CreateConnection()
        {
            return new NpgsqlConnection(_connectionString);
        }

        public async Task<User> Login(string email, string password)
        {
   

            string getUserSql = @"SELECT * FROM public.""User"" WHERE ""Email"" = @Email and ""Password"" = @Password";
            using var dbConnection = CreateConnection();
            return await dbConnection.QueryFirstAsync<User>(getUserSql, new { Email = email, Password = password});
        }
    }

}
