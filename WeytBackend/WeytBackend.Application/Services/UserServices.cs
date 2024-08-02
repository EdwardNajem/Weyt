using Microsoft.AspNetCore.Components.Forms;
using WeytBackend.Application.DTO;
using WeytBackend.Domain.Entities;
using WeytBackend.Infrastructure.Repository;

namespace WeytBackend.Application.Services
{
    public interface IUserServices
    {
        public Task<User?> Login(UserLoginDTO login);
        public Task<User?> SignUp(UserSignUpDTO signUp);
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

        public async Task<User?> Login(UserLoginDTO login)
        {
            string email = login.Email.Trim();
            string password = login.Password.Trim();

            email = email.ToLower();
            
            User user = await _userRepository.Login(email);

            Boolean hashedPassword = _passwordServices.ComparePassword(password , user.Password);

            if (hashedPassword == true)
                return user;
            else
                return null;
        }

        public async Task<User?> SignUp(UserSignUpDTO signup)
        {
            string name = signup.Name.Trim();
            string email = signup.Email.Trim();
            string password = signup.Password.Trim();

            email = email.ToLower();

            string hashedPassword = _passwordServices.HashPassword(password);

            var users = await _userRepository.GetAllUsers();

            var user = users.FirstOrDefault(user => user.Email == email);

            if (user == null)
            {
                await _userRepository.SignUp(name, email, hashedPassword);
                return null;
            }
            return user;
        }
    }
}
