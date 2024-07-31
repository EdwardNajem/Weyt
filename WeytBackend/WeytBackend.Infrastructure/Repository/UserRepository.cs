using Dapper;
using Npgsql;
using WeytBackend.Domain.Entities;

namespace WeytBackend.Infrastructure.Repository
{
    public interface IUserRepository
    {
        public Task<User> Login(string email);
        public Task<IEnumerable<User>> GetAllUsers();
        public Task SignUp(string name, string email, string password);
    }
    public class UserRepository(string connectionString) : IUserRepository
    {
        private readonly string _connectionString = connectionString;

        private Npgsql.NpgsqlConnection CreateConnection()
        {
            return new NpgsqlConnection(_connectionString);
        }

        public async Task<User> Login(string email)
        {
            string getUserSql = @"SELECT * FROM public.""User"" WHERE ""Email"" = @Email";
            using var dbConnection = CreateConnection();
            return await dbConnection.QueryFirstAsync<User>(getUserSql, new { Email = email});
        }
        public async Task<IEnumerable<User>> GetAllUsers()
        {
            string findUserSql = @"SELECT * FROM public.""User""";
            using var dbConnection = CreateConnection();
            return await dbConnection.QueryAsync<User>(findUserSql);
        }
        public async Task SignUp(string name, string email, string password)
        {
            string getUserSql = @"INSERT INTO public.""User"" ( ""Name"", ""Email"", ""Password"") VALUES (@Name, @Email, @Password)";
            using var dbConnection = CreateConnection();
            await dbConnection.ExecuteAsync(getUserSql, new { Name = name, Email = email, Password = password });
        }

    }

}
