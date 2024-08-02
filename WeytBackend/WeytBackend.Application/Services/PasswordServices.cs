using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace WeytBackend.Application.Services
{
    public interface IPasswordServices
    {
        public string HashPassword(string inputPassword);
        public Boolean ComparePassword(string inputPassword, string actualPassword);
    }
    public class PasswordServices : IPasswordServices
    {
        public Boolean ComparePassword(string inputPassword, string actualPassword)
        {
            return BCrypt.Net.BCrypt.Verify(inputPassword, actualPassword);
        }

        public string HashPassword(string inputPassword)
        {
            return inputPassword = BCrypt.Net.BCrypt.HashPassword(inputPassword);
        }
    }
}
