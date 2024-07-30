using WeytBackend.Application.DTO;
using WeytBackend.Domain.Entities;
using WeytBackend.Infrastructure.Repository;

namespace WeytBackend.Application.Services
{
    public interface IUserServices
    {
        public Task<User> Login(UserLoginDTO login);
    }

    public class UserServices : IUserServices
    {
        private readonly IUserRepository _userRepository;
        private IPasswordServices _passwordServices;

        public UserServices(IUserRepository userRepository, IPasswordServices passwordServices)
        {
            _userRepository = userRepository;
            _passwordServices = passwordServices;
        }

        public async Task<User> Login(UserLoginDTO login)
        {
            string email = login.Email;
            string password = login.Password;

            string hashedPassword = _passwordServices.HashPassword(password);

            email = email.ToLower();
            return await _userRepository.Login(email, hashedPassword);
        }
    }
}
