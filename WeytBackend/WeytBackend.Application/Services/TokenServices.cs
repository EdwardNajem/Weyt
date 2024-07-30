using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using WeytBackend.Application.DTO;

namespace WeytBackend.Application.Services
{
    public interface ITokenServies
    {
        public string GenerateToken(UserLoginDTO userLogin);
    }
    public class TokenServices : ITokenServies
    {
        private readonly IConfiguration _config;

        public TokenServices(IConfiguration config)
        {
            _config = config;
        }

        string ITokenServies.GenerateToken(UserLoginDTO userLogin)
        {
            Console.WriteLine(_config["Jwt:Key"]);
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JwtSettings:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.Name, userLogin.Email),
                new Claim(ClaimTypes.Role, "user")
            };

            Console.WriteLine(claims);
            var token = new JwtSecurityToken(_config["JwtSettings:Issuer"],
              _config["JwtSettings:Audience"],
              claims,
              expires: DateTime.Now.AddHours(5),
              signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
};
