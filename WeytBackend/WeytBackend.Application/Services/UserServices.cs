using WeytBackend.Application.DTO;
using WeytBackend.Domain.Entities;
using WeytBackend.Infrastructure.Repository;

namespace WeytBackend.Application.Services
{
    public interface IUserServices
    {
        public Task<User> Login(UserLoginDTO login);

        public Task<User> SignUp(UserSignUpDTO signUp);
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
            string email = login.Email.Trim();
            string password = login.Password.Trim();

            //string hashedPassword = _passwordServices.HashPassword(password);

            email = email.ToLower();
            return await _userRepository.Login(email, password);
        }

        public async Task<User> SignUp(UserLoginDTO signup)
        {
            string name  = 
            string email = signup.Email.Trim();
            string password = signup.Password.Trim();

            //string hashedPassword = _passwordServices.HashPassword(password);

            email = email.ToLower();
            return await _userRepository.Login(email, password);
        }
    }
}
